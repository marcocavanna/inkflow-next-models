import * as mongoose from 'mongoose';

import { APIResponse, AugmentedSchema, Nullable } from '../generic';

import { RegistryEntity } from './Registry';


export namespace ContactEntity {

  /**
   * The Model is used to create a new Entity
   * keep in mind that the created entity will not be
   * saved on Database unless the .save() function will be called
   */
  export interface Model extends Statics, mongoose.Model<Document> {
    new(doc?: mongoose.DocumentDefinition<Document>): Document;
  }


  /**
   * The document is the remapped entity received from database
   * this document will have virtuals and methods defined
   * into entity schema
   */
  export interface Document extends AugmentedSchema<Schema>, Methods, AugmentedSchema<Virtuals>, mongoose.Document {
    _id: mongoose.Types.ObjectId;

    id: string;
  }


  /**
   * The json interface type define the documents that will
   * be passed to client using API Endpoint response
   */
  export interface JSON extends APIResponse<Schema & Virtuals> {
    _id: string;

    id: string;
  }


  /**
   * Define the Main Schema, describing all field
   * that will be controlled by user and by API
   * this fields will be saved on database
   */
  export interface Schema {
    /** Single Contact Addresses */
    addresses: RegistryEntity.Address[];

    /** Contact Birthday */
    birthDate?: Nullable<number>;

    /** Emails Array */
    emails: RegistryEntity.Reference[];

    /** Contact Fiscal Code */
    fiscalCode?: Nullable<string>;

    /** Contact Name */
    name: string;

    /** Contact Note */
    note?: Nullable<string>;

    /** Original OndaID */
    ondaID?: Nullable<string>;

    /** Phones Array */
    phones: RegistryEntity.Reference[];

    /** Parent Registry */
    registryOndaId?: Nullable<number>;

    /** Contact Type */
    type?: Nullable<string>;

    /** Contact SubName */
    subName?: Nullable<string>;

    /** Contact VAT Number */
    vatNumber?: Nullable<string>;

    /** Contact Webs Reference */
    webs: RegistryEntity.Reference[];
  }


  /**
   * Describe all methods that each entity document have
   * and that could use once they are mapped into document
   */
  export interface Methods {
  }


  /**
   * Describe all virtuals field
   */
  export interface Virtuals {
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }

}
