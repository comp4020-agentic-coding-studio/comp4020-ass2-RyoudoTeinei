import { describe, expect, it } from "vitest";
import { completionRecord, initialState, scenarios, transition } from "../src/lib/exit-lab";
describe("a practice request is not a cancellation result",()=>{
  for(const scenario of scenarios){
    it(scenario.id+": follows evidence through a timeout before producing a record",()=>{
      let state=initialState();
      const wrong=transition(state,{type:"ROUTE",value:"not-the-biller"},scenario);
      expect(wrong.stage).toBe("route");expect(wrong.feedback).not.toBe("");
      state=transition(state,{type:"ROUTE",value:scenario.route},scenario);
      expect(state.stage).toBe("terms");
      const bad=scenario.choices.find((choice)=>choice.value!==scenario.correctChoice)!;
      expect(transition(state,{type:"TERMS",value:bad.value},scenario).stage).toBe("terms");
      state=transition(state,{type:"TERMS",value:scenario.correctChoice},scenario);
      expect(state.stage).toBe("ready");
      state=transition(state,{type:"REQUEST"},scenario);
      expect(state.stage).toBe("pending");expect(completionRecord(scenario,state)).toBeNull();
      state=transition(state,{type:"TIMEOUT"},scenario);
      expect(state.stage).toBe("uncertain");expect(completionRecord(scenario,state)).toBeNull();
      expect(transition(state,{type:"ASSUME"},scenario).stage).toBe("uncertain");
      state=transition(state,{type:"VERIFY"},scenario);
      expect(completionRecord(scenario,state)).toContain(scenario.confirmation);
      expect(completionRecord(scenario,state)).toContain(scenario.endDate);
    });
  }
  it("cannot skip straight to verification",()=>{
    expect(transition(initialState(),{type:"VERIFY"},scenarios[0])).toEqual(initialState());
  });
  it("ignores a late timeout after a reset",()=>{
    const reset=transition({stage:"pending",feedback:""},{type:"RESET"},scenarios[0]);
    expect(transition(reset,{type:"TIMEOUT"},scenarios[0])).toEqual(initialState());
    expect(completionRecord(scenarios[0],reset)).toBeNull();
  });
});
