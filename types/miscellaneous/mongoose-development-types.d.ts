import * as mongoose from 'mongoose';
import { AnyObject } from '../generic';


/* --------
 * Plugin Types : Mongoose AutoIncrement
 * -------- */
export interface MongooseAutoIncrementPathOptions<Definition extends AnyObject = {}> {
  /**
   * Set the field as an Auto Increment field.
   * As the autoIncrement plugin must use a unique ID,
   * it will be auto generated if property will be set
   * as a boolean.
   * To set a custom id, set as a string
   */
  autoIncrement?: boolean | string;

  /** Set discriminator fields */
  autoIncrementDiscriminators?: string[];

  /** A formatted auto increment field could be used */
  autoIncrementFormattedField?: string;

  /** Set the Format Function */
  autoIncrementFormatter?: (counter: number, doc: DocumentOf<Definition>) => Promise<any>;

  /** The increment start */
  autoIncrementStart?: number;

  /** The increment value */
  autoIncrementValue?: number;
}


/* --------
 * Plugin Types : Mongoose Calculate
 * -------- */
export type MongooseCalculateAvailableMiddlewares = 'validate' | 'updateOne' | 'save' | 'remove';

export type MongooseCalculateFunction<Definition extends AnyObject = {}, Result> = (
  this: DocumentOf<Definition>,
  old: undefined | Result
) => Result | Promise<Result>;

export interface MongooseCalculatePathOptions<Definition extends AnyObject = {}, Result = any> {
  /** The calculate function executed on save */
  calculate?: MongooseCalculateFunction<Definition, Result>;

  /** Set if an error will interrupt process */
  calculateErrorWillThrow?: boolean;

  /** Set Middleware */
  calculateOn?: MongooseCalculateAvailableMiddlewares[];

  /** Execution Priority */
  priority?: number;

  /** Set if the calculation must be update every time */
  updateCalculation?: boolean | ((this: DocumentOf<Definition>, old: undefined | Result) => boolean);
}


/* --------
 * Plugin Types : Mongoose Lookup
 * -------- */
export interface MongooseLookupPathOptions<Definition extends AnyObject> {
  /** The lookup Model to use */
  lookup?: string | mongoose.Model<mongoose.Document>;

  /** Change the Path into Look for the ObjectID */
  lookupPath?: string;

  /** Select only Certain Fields */
  lookupSelect?: string[];

  /** Set if lookup Entity must be updated */
  updateLookup?: boolean | ((this: DocumentOf<Definition>) => Promise<boolean>);
}


/* --------
 * Mongoose Augmented Types
 * -------- */
export type DocumentOf<Definition extends AnyObject> =
  Definition
  & mongoose.Document
  & Partial<mongoose.Types.Embedded>
  & {
  _id: mongoose.Types.ObjectId
};

export type AugmentedSchemaTypeOptions<Definition extends AnyObject> =
  MongooseAutoIncrementPathOptions<Definition>
  & MongooseCalculatePathOptions<Definition>
  & MongooseLookupPathOptions<Definition>
  & mongoose.SchemaTypeOpts<any>;

export interface AugmentedSchemaType<Definition extends AnyObject> extends mongoose.SchemaType {
  /** Check if field is an Array */
  $isMongooseArray?: boolean;

  /** Check if field is an Array of Documents */
  $isMongooseDocumentArray?: boolean;

  /** Path Options */
  options?: AugmentedSchemaTypeOptions<Definition>;

  /** On mongoose array, options are stored into schema options */
  schemaOptions?: AugmentedSchemaTypeOptions<Definition>;
}
