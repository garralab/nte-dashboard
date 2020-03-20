// Utilities
export class Functions {

  // Get parameter value from query string
  public static GetParameterByName(name: string) {
    name = name.replace(/[\[]/, "\\[")
      .replace(/[\]]/, "\\]")
      .toLowerCase();
    const regex: RegExp = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results: RegExpExecArray = regex.exec(location.search.toLowerCase());
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  //Check if an obj is null, using the strict equals "===" comparer
  public static IsNull(obj: any): boolean {
    return obj === null;
  }

  //Check if an obj is undefined
  public static IsUndefined(obj: any): boolean {
    return (typeof obj) === 'undefined';
  }

  //Check if an obj is null or undefined
  public static IsNullOrUndefined(obj: any): boolean {
    return (Functions.IsNull(obj) || Functions.IsUndefined(obj));
  }

  public static IsStringEmpty(value: string) {
    if (Functions.IsNullOrUndefined(value))
      return true;
    else
      return value.length > 0 ? false : true;
  }

  //Format the inner exception to be shown in console
  public static FormatInnerException(exceptionMessage: string, exceptionStackTrace: string): string {
    let error: string = "";
    error = exceptionMessage + "\n";
    if (exceptionStackTrace != null)
      error += exceptionStackTrace;
    return error;
  }

  // calculate the elapsed time, from a specific start date to now
  public static GetElapsedTime(startDateTime: number) {
    const endTime: number = performance.now();
    return endTime - startDateTime;
  }

  //Converts float OLE Date to a date
  public static FromOADate(msDate: any) {
    const currentDate: Date = new Date(((msDate - 25569) * 86400000));
    const timeZone: number = currentDate.getTimezoneOffset();
    const adjustedDate: Date = new Date(((msDate - 25569 + (timeZone / (60 * 24))) * 86400000));
    return adjustedDate;
  }

  //Converts date to a float OLE Date
  public static ToOADate(jsDate: any) {
    jsDate = jsDate || new Date();
    const timezoneOffset: number = jsDate.getTimezoneOffset() / (60 * 24);
    const msDateObj: number = (jsDate.getTime() / 86400000) + (25569 - timezoneOffset);
    return msDateObj;
  }

  //Used for filter, intersect two set
  public static Intersect(a: any, b: any) {
    const result: any[] = new Array();
    for (let i: number = 0, alength: number = a.length; i < alength; i++) {
      for (let j: number = 0, blength: number = b.length; j < blength; j++) {
        if (a[i] === b[j]) {
          result.push(a[i]);
          break;
        }
      }
    }
    return result;
  }

  public static MultipleIntersection(arrays: string[][]): string[] {
    if (arrays.length == 0)
      return [];
    const result: string[] = arrays.shift()
      .filter(function (v: string) {
        return arrays.every(function (a: string[]) {
          return a.indexOf(v) !== -1;
        });
      });
    return result;
  }

  public static CreateGuid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16)
        .substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4()
      .substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  }

  public static CreateRandomString() {
    let text: string = "";
    const possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i: number = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  public static FromStringToNumber(value: string) {
    if (this.IsStringEmpty(value))
      return undefined;
    else
      if (value == "yes" || value == "si" || value == "y" || value == "ye" || value == "s") {
        return 1;
      }

    if (value == "no" || value == "n") {
      return 0;
    }

    if (value == "-" || value == "+") {
      return 0;
    }

    return parseFloat(value.replace(',', '.'));
  }

  public static GetCurrentDate() {
    var options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    var today = new Date();

    return today.toLocaleDateString("it-IT", options);
  }

  public static GetFormattedDate(date: Date) {
    var options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString("it-IT", options);
  }

  public static GetDateHour(date: Date) {
    var options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString("it-IT", options);
  }

  public static replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'gi'), replace);
  }

  public static escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  public static calculateMoonPhase(day: number, month: number, year: number) {
    let c = 0;
    let e = 0;
    let jd = 0;
    let b = 0;

    if (month < 3) {
      year--;
      month += 12;
    }

    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; // jd is total days elapsed
    jd /= 29.5305882; // divide by the moon cycle
    b = parseInt(jd.toString()); // int(jd) -> b, take integer part of jd
    jd -= b; // subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); // scale fraction from 0-8 and round

    if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0

    switch (b) {
      case 0:
        return {
          name: "Luna Nuova",
          icon: 'wi-moon-alt-new'
        };
      case 1:
        return {
          name: "Luna Crescente",
          icon: 'wi-moon-alt-waxing-crescent-4'
        };
      case 2:
        return {
          name: "Primo Quarto",
          icon: 'wi-moon-alt-first-quarter'
        };
      case 3:
        return {
          name: "Gibbosa Crescente",
          icon: 'wi-moon-alt-waxing-gibbous-4'
        };
      case 4:
        return {
          name: "Luna Piena",
          icon: 'wi-moon-alt-full'
        };
      case 5:
        return {
          name: "Gibbosa Calante",
          icon: 'wi-moon-alt-waning-gibbous-4'
        };
      case 6:
        return {
          name: "Ultimo Quarto",
          icon: 'wi-moon-alt-third-quarter'
        };
      case 7:
        return {
          name: "Luna Calante",
          icon: 'wi-moon-alt-waning-crescent-4'
        };
    }
  }

  public static validateEmail(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }
}
