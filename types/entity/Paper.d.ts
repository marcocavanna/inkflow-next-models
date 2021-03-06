import * as mongoose from 'mongoose';

import { APIResponse, AugmentedSchema, Nullable } from '../generic';


export namespace PaperEntity {

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
    /** Paper full code */
    code: string;

    /** Paper commercial name */
    commercialName: Nullable<string>;

    /** Paper fiber side width */
    fiberSideWidth: number;

    /** Paper grams per sheet */
    grams: number;

    /** Paper short code */
    shortCode: string;

    /** Paper sub type */
    subType: Nullable<string>;

    /** Team namespace */
    team: string;

    /** Paper type */
    type: string;

    /** Paper width */
    width: number;
  }


  /**
   * Describe all methods that each entity document have
   * and that could use once they are mapped into document
   */
  export interface Methods {
    /** Get the paper full code */
    getCode(): string;

    /** Get the product code only */
    getProductCode(): string;

    /** Get the paper short code */
    getShortCode(): string;
  }


  /**
   * Describe all virtuals field
   */
  export interface Virtuals {
    /** The paper weight */
    weight: number;
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }

}
