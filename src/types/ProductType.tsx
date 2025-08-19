export type ProductType = {
  ID: number;
  Name: string; //find a way to limit the string
  Description?: string; // up to 200 words
  Price: number; // larger then zero
  CreationDate: Date;
};
