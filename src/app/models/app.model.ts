import { Functions } from '../utilities.functions';

export class DashboardData {
  public dashboardID: string;
  public dashboardTitle: string;
  public invitedPlayerMail: string[];
  public masterMail: string;

  public sheets: CharacterSheet[];
  public extractions: Extraction[];

  constructor(dashboardID: string, dashboardTitle: string, invitedPlayerMail: string[], masterMail: string) {
    this.dashboardID = dashboardID;
    this.dashboardTitle = dashboardTitle;
    this.invitedPlayerMail = invitedPlayerMail;
    this.masterMail = masterMail;
    this.sheets = [];
    this.extractions = [];
  }
}

export class CharacterSheet {
  public uid: string;
  public playerName: string;
  public playerEmail: string;

  public characterName: string;
  public rischio: string = "";
  public trats: Trats = new Trats();
  public lessons: Lesson[] = [new Lesson(), new Lesson(), new Lesson()];
  public resources: string[] = ["", "", "", "", "", "", "", "", "", ""];
  public sventure: string[] = ["", "", "", ""];
  public dazed: boolean = false;
  public adrenaline: boolean = false;

  constructor(playerEmail: string) {
    this.uid = Functions.CreateGuid();
    this.playerEmail = playerEmail;
    this.characterName = "Personaggio di " + playerEmail;
  }
}

export class Lesson {
  public name: string;
  public description: string;
  public activated: boolean = false;
}

export class Trats {
  public archetype: Hexagon = new Hexagon();

  public qn: Hexagon = new Hexagon();
  public qs: Hexagon = new Hexagon();
  public qne: Hexagon = new Hexagon();
  public qnw: Hexagon = new Hexagon();
  public qse: Hexagon = new Hexagon();
  public qsw: Hexagon = new Hexagon();

  public skn1: Hexagon = new Hexagon();
  public skn2: Hexagon = new Hexagon();
  public skn3: Hexagon = new Hexagon();
  public sks1: Hexagon = new Hexagon();
  public sks2: Hexagon = new Hexagon();
  public sks3: Hexagon = new Hexagon();
  public ske1: Hexagon = new Hexagon();
  public ske2: Hexagon = new Hexagon();
  public ske3: Hexagon = new Hexagon();
  public skw1: Hexagon = new Hexagon();
  public skw2: Hexagon = new Hexagon();
  public skw3: Hexagon = new Hexagon();

  constructor() {

  }
}

export class Hexagon {
  public name: string = "";
  public tokenized: boolean = false;

  constructor() {

  }
}

export class InviteDialogData {
  public email: string = "";
}

export enum Token {
  Positive = 0,
  Negative = 1,
  Random = 2
}

export class Sacchetto {
  public positive: number = 0;
  public negative: number = 0;
  public random: number = 0;
  public extract: number = 1;

  public initialExtractionSack: Token[] = [];
  public extractionSack: Token[] = [];  
  public extracted: Token[] = [];
  public riskExtracted: Token[] = [];

  constructor() {

  }
}

export class Extraction {
  public owner: string = "";
  public isRisk: boolean = false;
  public extractionResult: Token[] = [];
  public extractionRiskResult: Token[] = [];
  public extractionSack: Token[] = [];

  constructor(owner: string, extractionResult: Token[], extractionSack: Token[]) {
    this.owner = owner;
    this.extractionResult = extractionResult;
    this.extractionSack = extractionSack;
  }
}
