import * as mongoose from 'mongoose';

import { APIResponse } from '../generic';


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
  export interface Document extends Schema, Methods, Virtuals, mongoose.Document {
  }


  /**
   * The json interface type define the documents that will
   * be passed to client using API Endpoint response
   */
  export interface JSON extends APIResponse<Omit<Schema, 'password'> & Virtuals> {
    _id: string;

    id: string;
  }


  /**
   * Define the Main Schema, describing all field
   * that will be controlled by user and by API
   * this fields will be saved on database
   */
  export interface Schema {
    /** The user Email */
    email: string;

    /** Verified Email Checker */
    emailVerified: boolean;

    /** Set/Check if the user is a Commercial Manager */
    isCommercialManager: boolean;

    /** Set/Check if the user is a Project Manager */
    isProjectManager: boolean;

    /** Set/Check if the user is a System Administrator */
    isSystemAdministrator: boolean;

    /** The user Name */
    name: string;

    /** The User Encrypted Password */
    password: string;

    /** Photo URL Location */
    photoURL: string;

    /** User settings and Preferences */
    preferences: Preferences.Schema;

    /** User Role */
    role: ROLE;

    /** The User Surname */
    surname: string;
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
    completeName: string;

    /** User Initials */
    initials: string;

    /** The Role Name Translation */
    roleName: string;
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
    test(): string;
  }


  export enum ROLE {
    SECRETARY = 2,
    COMMERCIAL = 3,
    TECH = 4,
    TECH_ADMINISTRATOR = 5,
    FISCAL = 6,
    OWNER = 8,
    ADMINISTRATOR = 10
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
