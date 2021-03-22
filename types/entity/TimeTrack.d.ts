import * as mongoose from 'mongoose';

import { APIResponse, AugmentedSchema, Nullable, PopulableField } from '../generic';

import { MachineEntity } from './Machine';
import { OperatorEntity } from './Operator';
import { ProcessingPhaseEntity } from './ProcessingPhase';
import { ProductionOrderEntity } from './ProductionOrder';


export namespace TimeTrackEntity {

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
    /** Current time track will close relative processing phase */
    closeProcessingPhase: boolean;

    /** The track end time */
    endTime: Nullable<number>;

    /** Check if time track has been closed */
    isClosed: boolean;

    /** Check if time track is a system created timer */
    isSystemTimer: boolean;

    /** The relative time track machine */
    machine: PopulableField<MachineEntity.Document>;

    /** Notes of Time Track */
    notes: Nullable<string>;

    /** The operator who start the timer */
    operator: PopulableField<OperatorEntity.Document>;

    /** Manually overridden tracked time in ms */
    overriddenTrackedTime: Nullable<number>;

    /** Time Track Pauses */
    pauses: Pauses.Document[];

    /** Related processing phase */
    processingPhase: PopulableField<ProcessingPhaseEntity.Document>;

    /** Related production order */
    productionOrder: PopulableField<ProductionOrderEntity.Document>;

    /** Total quantity produced */
    quantityProduced: number;

    /** Recto sheet count on Printing time track */
    rectoSheetCount: number;

    /** Recto Verso Sheet count on Printing time track */
    rectoVersoSheetCount: number;

    /** The start time timestamp */
    startTime: number;

    /** The count of startup */
    startupCount: number;

    /** The team namespace */
    team: string;

    /** Verso Sheet count on Printing Time track */
    versoSheetCount: number;

    /** Machine washing count on Printing Time Track */
    washingCount: number;
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
    /** Check if timer is Paused */
    isPaused: boolean;

    /** Check if timer is Running */
    isRunning: boolean;

    /** The original tracked time */
    originalTrackedTime: number;

    /** The time tracked */
    trackedTime: number;
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }


  export namespace Pauses {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export type Document = Schema & Virtuals & mongoose.Types.Subdocument;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    export interface Schema {
      /** Pause end time */
      end: Nullable<number>;

      /** Pause start time */
      start: number;
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    export interface Virtuals {
      /** Pause duration */
      duration: number;
    }
  }
}
