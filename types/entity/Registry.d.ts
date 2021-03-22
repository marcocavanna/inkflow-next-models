import * as mongoose from 'mongoose';

import { APIResponse, Nullable, AugmentedSchema, PopulableVirtualCollection, PopulableField } from '../generic';
import { BankEntity } from './Bank';
import { ContactEntity } from './Contact';
import { PaymentDueDateEntity } from './PaymentDueDate';
import { VatCodeEntity } from './VatCode';


export namespace RegistryEntity {

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

    inlineAddress: string;

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
  export interface Document extends AugmentedSchema<Schema>, Methods, AugmentedSchema<Virtuals>, mongoose.Document {
    _id: mongoose.Types.ObjectId;

    id: string;
  }

  export interface Lookup extends AugmentedSchema<Schema>, AugmentedSchema<Virtuals> {
    _id: mongoose.Types.ObjectId;

    id: string;
  }


  /**
   * The json interface type define the documents that will
   * be passed to client using API Endpoint response
   */
  export type JSON = APIResponse<AugmentedSchema<Schema> & AugmentedSchema<Virtuals>> & {
    _id: string;
    id: string;
  };


  /**
   * Registries has a reduced Schema used while
   * lookup entity to save redundant information
   */
  export interface LookupSchema {
    /** The registry fiscalCode */
    fiscalCode?: Nullable<string>;

    /** The Registry Name */
    name: string;

    /** The Registry SubName */
    subName?: Nullable<string>;

    /** The Registry VAT Number */
    vatNumber?: Nullable<string>;
  }


  /**
   * Define the Main Schema, describing all field
   * that will be controlled by user and by API
   * this fields will be saved on database
   */
  export interface Schema extends LookupSchema {
    /** Banks List */
    banks: BankEntity.Document[];

    /** Emails list */
    emails: Reference[];

    /** Faxes lists */
    faxes: Reference[];

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

    /** Original Onda ID */
    ondaID?: Nullable<number>;

    /** Registry Payment Due Date */
    paymentDueDate: {
      asCustomer: PopulableField<PaymentDueDateEntity.Document>,
      asSupplier: PopulableField<PaymentDueDateEntity.Document>
    }

    /** Pec Emails */
    pecEmails: Reference[];

    /** Phones */
    phones: Reference[];

    /** Shipment Offices */
    shipmentOffices: Address[];

    /** Related Team */
    team: string;

    /** Registry Vat Code */
    vatCodes: {
      asCustomer: PopulableField<VatCodeEntity.Document>,
      asSupplier: PopulableField<VatCodeEntity.Document>
    },

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
    /** Related Contacts */
    contacts: PopulableVirtualCollection<ContactEntity.Document>;

    /** The display name */
    displayName: string;

    /** Check if Registry has Fiscal Information */
    hasFiscalInformation: boolean;

    /** Primary Fiscal Information */
    primaryFiscal: Nullable<string>;

    /** Secondary Fiscal Information */
    secondaryFiscal: Nullable<string>;
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }

}
