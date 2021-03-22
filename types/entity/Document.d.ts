import * as mongoose from 'mongoose';

import { APIResponse, AugmentedSchema, PopulableField } from '../generic';
import { UserEntity } from './User';


export namespace DocumentEntity {

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
    /** Original filename extension */
    extension: string;

    /** File MD5 Hash */
    md5: string;

    /** File mimetype */
    mimetype: string;

    /** The file name to display */
    name: string;

    /** Original fileName */
    originalFilename: string;

    /** The parent document */
    parent: mongoose.Schema.Types.ObjectId,

    /** The parent model */
    parentModel: string;

    /** The user who upload the file */
    sender: PopulableField<UserEntity.Document>;

    /** Sent timestamp */
    sentOn: number;

    /** File size */
    size: number;

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
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }

}
