export type CertificationType = {
  name: string;
  imageLink: string; // picsum placeholder image link
  certLink: string;
  dateIssued?: Date;
  expiryDate?: Date;
  issuingOrganization?: string;
  description?: string;
};
