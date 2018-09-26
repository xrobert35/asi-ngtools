
export class AsiMimeType {

  static PDF = new AsiMimeType('.pdf' , 'application/pdf');
  static DOC = new AsiMimeType('.doc' , '	application/msword');
  static DOCX = new AsiMimeType('.docx' , 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

  constructor(public extension: string, public mimeType: string) {
  }
}
