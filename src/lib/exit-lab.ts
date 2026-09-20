export type Stage = "route" | "terms" | "ready" | "pending" | "uncertain" | "verified";
export interface Scenario {
  id: string; title: string; category: string; description: string;
  service: string; biller: string; account: string; price: string;
  commitment: string; goal: string; endDate: string; route: string;
  rule: string; choices: { value: string; label: string; explanation: string }[];
  correctChoice: string; outcome: string; confirmation: string; lesson: string;
}
export const scenarios: Scenario[] = [
  { id:"apple",title:"The wrong account.",category:"01 / APP-STORE BILLING",description:"The receipt says NORTH. The phone says SOUTH. Find the right door.",
    service:"STAY+",biller:"Apple",account:"NORTH",price:"A$12 / month",commitment:"Monthly",goal:"Stop the next renewal. Keep the period already paid for.",endDate:"8 October 2026",route:"apple",
    rule:"This fictional plan allows renewal to be switched off while paid access continues to 8 October. The phone is currently signed into SOUTH.",
    choices:[
      {value:"keep-access",label:"Use NORTH, end renewal and keep paid access until 8 October.",explanation:"The receipt identifies NORTH and the printed plan rule supports this outcome."},
      {value:"delete",label:"Delete the app from the phone.",explanation:"Removing an app does not establish the subscription's billing state."},
      {value:"wrong-account",label:"Stay in SOUTH and assume an empty list means it is cancelled.",explanation:"SOUTH is not the purchasing account on this receipt."}],
    correctChoice:"keep-access",outcome:"Renewal off; paid access retained to the stated end date.",confirmation:"ST-104",lesson:"04-apple-account" },
  { id:"annual",title:"Monthly is only half the story.",category:"02 / ANNUAL COMMITMENT",description:"Six payments remain. Read the supplied terms before confirming the exit.",
    service:"Mosaic Studio",biller:"Mosaic Studio direct",account:"NORTH",price:"20 practice units / month",commitment:"Annual; six payments remain",goal:"Leave now after reviewing the stated early-exit cost.",endDate:"15 October 2026",route:"direct",
    rule:"Fictional practice terms: early cancellation costs half the remaining commitment. Six payments of 20 remain, so the displayed amount is 60. Access ends 15 October. This is not a quote for any real Adobe account.",
    choices:[
      {value:"free",label:"Assume monthly payments mean there is no remaining commitment.",explanation:"Payment frequency does not override the annual commitment printed on this card."},
      {value:"review-quote",label:"Review the quoted 60-unit charge and end date before confirming.",explanation:"Six times 20 times one-half is 60 under these fictional terms. The customer can now make an informed choice."},
      {value:"guaranteed-refund",label:"Assume a news story guarantees a full refund.",explanation:"A general news report does not establish this fictional account's refund entitlement."}],
    correctChoice:"review-quote",outcome:"Renewal off; the accepted practice exit charge is 60 units.",confirmation:"MS-206",lesson:"06-adobe-terms" },
  { id:"partner",title:"One service. Another biller.",category:"03 / PARTNER BILLING",description:"Leave a video add-on while keeping the rest of the bundle.",
    service:"Screen Club",biller:"Campus Connect bundle",account:"HOUSEHOLD",price:"Included video add-on",commitment:"Monthly add-on",goal:"Remove Screen Club only. Keep the other bundle services.",endDate:"31 October 2026",route:"partner",
    rule:"Fictional bundle terms: Campus Connect manages add-ons. Removing Screen Club stops its renewal and keeps already-paid access until 31 October. The rest of the bundle remains active.",
    choices:[
      {value:"whole-bundle",label:"Close the whole Campus Connect bundle.",explanation:"That would change services the customer explicitly wants to keep."},
      {value:"sign-out",label:"Sign out of Screen Club on every device.",explanation:"Signing out does not establish a change to billing."},
      {value:"add-on",label:"Remove only Screen Club through Campus Connect's add-on management.",explanation:"The named biller controls this purchase and the action matches the customer's scope."}],
    correctChoice:"add-on",outcome:"Screen Club renewal off; all other bundle services unchanged.",confirmation:"SC-308",lesson:"08-netflix-partners" },
];
export interface LabState { stage: Stage; feedback: string; }
export type LabEvent =
  | { type:"ROUTE"; value:string }
  | { type:"TERMS"; value:string }
  | { type:"REQUEST" }
  | { type:"TIMEOUT" }
  | { type:"ASSUME" }
  | { type:"VERIFY" }
  | { type:"RESET" };
export const initialState = (): LabState => ({ stage:"route", feedback:"" });
export function transition(state:LabState,event:LabEvent,scenario:Scenario):LabState {
  if(event.type==="RESET") return initialState();
  if(event.type==="ROUTE" && state.stage==="route") return event.value===scenario.route
    ? {stage:"terms",feedback:""}
    : {...state,feedback:"Follow the named biller on the receipt. The service name alone does not decide the route."};
  if(event.type==="TERMS" && state.stage==="terms") {
    const choice=scenario.choices.find((item)=>item.value===event.value);
    return choice?.value===scenario.correctChoice ? {stage:"ready",feedback:""} : {...state,feedback:choice?.explanation ?? "Choose an action supported by the printed terms."};
  }
  if(event.type==="REQUEST" && state.stage==="ready") return {stage:"pending",feedback:""};
  if(event.type==="TIMEOUT" && state.stage==="pending") return {stage:"uncertain",feedback:""};
  if(event.type==="ASSUME" && state.stage==="uncertain") return {...state,feedback:"A timeout does not establish success or failure. Check the account's resulting state."};
  if(event.type==="VERIFY" && state.stage==="uncertain") return {stage:"verified",feedback:""};
  return state;
}
export function completionRecord(scenario:Scenario,state:LabState):string | null {
  if(state.stage!=="verified") return null;
  return [
    "HOW TO LEAVE — FICTIONAL PRACTICE RECORD",
    "Service: "+scenario.service,
    "Biller: "+scenario.biller,
    "Account alias: "+scenario.account,
    "Outcome: "+scenario.outcome,
    "Access ends: "+scenario.endDate,
    "Confirmation: "+scenario.confirmation,
    "No real subscription was changed."
  ].join("\n");
}
