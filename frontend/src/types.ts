export type CertificationType = {
  id: string; // used
  name: string; // used
  imageLink: string; // used
  certLink: string;
  dateIssued?: Date;
  expiryDate?: Date;
  issuingOrganization?: string;
  description?: string;
};
