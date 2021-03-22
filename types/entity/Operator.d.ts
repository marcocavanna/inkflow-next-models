import * as mongoose from 'mongoose';

import { APIResponse, AugmentedSchema, Nullable } from '../generic';


export namespace OperatorEntity {

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

    /** Last logins timestamp date */
    allLoginsDateTime: number[];

    /** Operator first name */
    firstName: string;

    /** Set if operator is an Admin */
    isAdmin: boolean;

    /** Set if operator is a Binder */
    isBinder: boolean;

    /** Set if operator is a Delivery Man */
    isDeliveryMan: boolean;

    /** Set if operator is a Printer */
    isPrinter: boolean;

    /** Set if operator is an internal system operator */
    isSystem: boolean;

    /** Operator last name */
    lastName: Nullable<string>;

    /** Operator login PIN */
    PIN: string;

    /** Team namespace */
    team: string;

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
    /** Concatenated names */
    displayName: string;

    /** Operator initials */
    initials: string;

    /** Last login timestamp */
    lastLogin: number | null;

    /** Operator types */
    types: string[];
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }

}
