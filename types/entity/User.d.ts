import * as mongoose from 'mongoose';

import { APIResponse, AugmentedSchema } from '../generic';


export namespace UserEntity {

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

  export interface Lookup extends AugmentedSchema<LookupSchema>, AugmentedSchema<Virtuals> {
    _id: mongoose.Types.ObjectId;

    id: string;
  }


  /**
   * The json interface type define the documents that will
   * be passed to client using API Endpoint response
   */
  export type JSON = APIResponse<AugmentedSchema<Omit<Schema, 'password'>> & AugmentedSchema<Virtuals>> & {
    _id: string;
    id: string;
  };


  /**
   * User has a reduced Schema used while
   * lookup entity to save redundant information
   */
  export interface LookupSchema {
    /** The user Email */
    email: string;

    /** Set/Check if the user is a Commercial Manager */
    isCommercialManager: boolean;

    /** Set/Check if the user is a Project Manager */
    isProjectManager: boolean;

    /** Set/Check if the user is a System Administrator */
    isSystemAdministrator: boolean;

    /** The user Name */
    name: string;

    /** Photo URL Location */
    photoURL: string;

    /** The User Surname */
    surname: string;
  }


  /**
   * Define the Main Schema, describing all field
   * that will be controlled by user and by API
   * this fields will be saved on database
   */
  export interface Schema extends LookupSchema {
    /** Verified Email Checker */
    emailVerified: boolean;

    /** The User Encrypted Password */
    password: string;

    /** User settings and Preferences */
    preferences: Preferences.Schema;

    /** User team Slug */
    team: string;
  }


  /**
   * Describe all methods that each entity document have
   * and that could use once they are mapped into document
   */
  export interface Methods {
    /** Check if user password is correct */
    isCorrectPassword(password: string): Promise<boolean>;
  }


  /**
   * Describe all virtuals field
   */
  export interface Virtuals {
    /** User Complete Name */
    displayName: string;

    /** User Initials */
    initials: string;
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {

  }

  export namespace Preferences {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export interface Schema {
      /** Currency Preferences */
      currency: Currency.Schema;

      /** The Date Format */
      dateFormat: string;

      /** The Time Format */
      timeFormat: string;
    }

    export namespace Currency {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      export interface Schema {
        /** Number of Decimals */
        decimalsCount: number;

        /** Decimals Separator Char */
        decimalsSeparator: string;

        /** Currency Format */
        format: string;

        /** Currency Symbol */
        symbol: string;

        /** Thousands Separator Char */
        thousandsSeparator: string;
      }
    }
  }

}
