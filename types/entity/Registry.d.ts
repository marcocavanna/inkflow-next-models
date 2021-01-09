import * as mongoose from 'mongoose';

import { APIResponse, Nullable } from '../generic';


export namespace RegistryEntity {

  /** The set of the populable path */
  export type PopulableFields = 'team';

  /**
   * The Reference interface will be used to
   * define each phone/mail/web registry reference
   */
  export interface Reference {
    isFavorite: boolean;

    label?: Nullable<string>;

    ondaID: string;

    value: string;
  }

  /**
   * The Address interface will be used to
   * define each single registry address
   */
  export interface Address {
    _id: string;

    city?: Nullable<string>;

    country?: Nullable<string>;

    emails: Reference[];

    isRegisteredOffice: boolean;

    isShipmentOffice: boolean;

    phones: Reference[];

    state?: Nullable<string>;

    street?: Nullable<string>;

    webs: Reference[];

    zipCode?: Nullable<string>;
  }

  /**
   * The Model is used to create a new Entity
   * keep in mind that the created entity will not be
   * saved on Database unless the .save() function will be called
   */
  export interface Model extends Statics, mongoose.Model<Document> {
  }


  /**
   * The document is the remapped entity received from database
   * this document will have virtuals and methods defined
   * into entity schema
   */
  export interface Document<PopulatedPath extends PopulableFields = never>
    extends Schema<PopulatedPath>, Methods, Virtuals, mongoose.Document {
    _id: mongoose.Types.ObjectId;

    id: string;
  }


  /**
   * The json interface type define the documents that will
   * be passed to client using API Endpoint response
   */
  export interface JSON<PopulatedPath extends PopulableFields = never>
    extends APIResponse<Schema<PopulatedPath> & Virtuals> {
    _id: string;

    id: string;
  }


  /**
   * Define the Main Schema, describing all field
   * that will be controlled by user and by API
   * this fields will be saved on database
   */
  export interface Schema<PopulatedPath extends PopulableFields = never> {
    /** Emails list */
    emails: Reference[];

    /** Faxes lists */
    faxes: Reference[];

    /** The registry fiscalCode */
    fiscalCode?: Nullable<string>;

    /** Registry head office */
    headOffice?: Address;

    /** Get or Set if Registry is an Active Customer */
    isActiveCustomer: boolean;

    /** Get or Set if Registry is an Active Supplier */
    isActiveSupplier: boolean;

    /** Get or Set if Registry is a Customer */
    isCustomer: boolean;

    /** Get or Set if Registry is a Supplier */
    isSupplier: boolean;

    /** The Registry Name */
    name: string;

    /** Pec Emails */
    pecEmails: Reference[];

    /** Phones */
    phones: Reference[];

    /** Shipment Offices */
    shipmentOffices: Address[];

    /** The Registry SubName */
    subName?: Nullable<string>;

    /** Related Team */
    team: string;

    /** The Registry VAT Number */
    vatNumber?: Nullable<string>;

    /** Webs */
    webs: Reference[];
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
