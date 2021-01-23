import * as mongoose from 'mongoose';

import { APIResponse, AugmentedSchema, Nullable, PopulableField } from '../generic';
import { RegistryEntity } from './Registry';
import { UserEntity } from './User';


export namespace ProductionOrderEntity {

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


  /**
   * The json interface type define the documents that will
   * be passed to client using API Endpoint response
   */
  export type JSON = APIResponse<AugmentedSchema<Schema> & AugmentedSchema<Virtuals>> & {
    _id: string;
    id: string;
  };


  /**
   * Define the Main Schema, describing all field
   * that will be controlled by user and by API
   * this fields will be saved on database
   */
  export interface Schema {
    /** Balance has been Checked */
    balanceChecked: boolean;

    /** The default value of Cliche */
    clicheCost: number;

    /** The ProductionOrder Commercial Manager */
    commercialManager: UserEntity.Lookup;

    /** ProductionOrder Main Customer */
    customer: RegistryEntity.Lookup;

    /** The Customer Order */
    customerOrder: {
      code: Nullable<string>
    };

    /** The productionOrder delivery Date */
    deliveryDate: number;

    /** Delivery Notes */
    deliveryNotes: Nullable<string>;

    /** Defined Extra Costs */
    extraCosts: mongoose.Types.DocumentArray<ExtraCost.Document>;

    /** The Production Order Extra Costs state */
    extraCostsState: ExtraCost.State;

    /** The FSC Type */
    fscType: Nullable<string>;

    /** A list of internal non compliances */
    internalNonCompliances: mongoose.Types.DocumentArray<InternalNonCompliance.Document>;

    /** Check if ProductionOrder is at Budget or at Closure */
    isAtBudget: boolean;

    /** Check if ProductionOrder is Billable */
    isBillable: boolean;

    /** Check if ProductionOrder is FSC */
    isFSC: boolean;

    /** Manual override overall value */
    manualOverallValue: number;

    /** The Official Name */
    name: string;

    /** The OpenedAt Date */
    openedAt: number;

    /** Override the Billable Account */
    overridedBillableAccount: Nullable<RegistryEntity.Lookup>;

    /** The ProductionOrder Profits Percentage on External Order */
    profitsPercentage: number;

    /** The ProductionOrder Project Manager */
    projectManager: UserEntity.Lookup;

    /** The Associated Quote Object */
    quote: {
      code: Nullable<string>;
    };

    /** The associated team */
    team: string;

    /** Technical Notes */
    technicalNotes: Nullable<string>;

    /** The Production Order Reference Year */
    year: number;
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
    /** The Production Order Billable Account */
    billableAccount: RegistryEntity.Lookup;

    /** Check if ProductionOrder has Manual Overall Value */
    hasManualOverallValue: boolean;
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }


  /* --------
   * Children Schemas
   * -------- */
  export namespace ExtraCost {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export type Document = Schema & mongoose.Types.EmbeddedDocument;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    export interface Schema {
      /** The User who Approved the ExtraCost */
      approvedBy: PopulableField<UserEntity.Document>;

      /** The date when ExtraCost is Created */
      date: number;

      /** The description of the ExtraCost */
      description: string;

      /** The User who Create the ExtraCost */
      insertBy: PopulableField<UserEntity.Document>;

      /** The value of the ExtraCost */
      value: number;
    }

    export enum State {
      NONE = 0,
      SCUCCESS = 1,
      WARNING = 2
    }
  }

  export namespace InternalNonCompliance {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export type Document = Schema & mongoose.Types.EmbeddedDocument;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    export interface Schema {
      /** The non Compliance Date insert */
      date: number;

      /** The non Compliance Description */
      description: string;

      /** If is a Bindery non Compliance */
      isBindery: boolean;

      /** If is a Digital Printing non Compliance */
      isDigital: boolean;

      /** If is a Offset Printing non Compliance */
      isOffset: boolean;

      /** If is a Technical non Compliance */
      isTechnical: boolean;

      /** The user who insert the non Compliance */
      insertBy: PopulableField<UserEntity.Document>;

      /** The non compliance value */
      value: number;

      /** The value description */
      valueDescription: Nullable<string>;
    }
  }
}
