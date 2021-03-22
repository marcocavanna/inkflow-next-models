import * as mongoose from 'mongoose';

import { APIResponse, AugmentedSchema, Nullable } from '../generic';


export namespace MachineEntity {

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
    /** Base machine hourly cost */
    hourlyCost: number;

    /** Base machine hourly value */
    hourlyValue: number;

    /** Machine type is Binder */
    isBindery: boolean;

    /** Machine type is Packager */
    isPackager: boolean;

    /** Machine type is Printer */
    isPrinter: boolean;

    /** The machine name */
    name: string;

    /** Printing Data */
    printing: Nullable<PrintingSettings.Document>;

    /** Producer Name */
    producer: Nullable<string>;

    /** The purchase date */
    purchaseDate: Nullable<number>;

    /** Team namespace */
    team: string;

    /** The machine type */
    type: Nullable<string>;
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
    /** Machine displayName */
    displayName: string;

    /** Machine initials */
    initials: string;

    /** Machine types */
    types: string[];
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }


  /**
   * Printing Settings Data
   */
  export namespace PrintingSettings {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export type Document = Schema & mongoose.Types.Subdocument;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    export interface Schema {
      /** Maximum Printer Colours Count */
      coloursCount: number;

      /** Check if is Digital Printer */
      isDigital: boolean;

      /** Check if is Offset Printer */
      isOffset: boolean;

      /** Check if is UV Printer */
      isUV: boolean;

      /** Set the Max Printing Size */
      maxPrintSize: {
        width: number;
        height: number;
      };

      /** Set the Minimum Printing Size */
      minPrintingSize: {
        width: number;
        height: number;
      };
    }
  }
}
