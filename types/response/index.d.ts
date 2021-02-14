import { ContactEntity, RegistryEntity, UserEntity, ProductionOrderEntity } from '../entity';
import { APIResponse, Populated } from '../generic';


export namespace Response {

  export namespace Auth {
    export interface Login {
      userData: APIResponse<Omit<UserEntity.JSON, 'password'>>;

      accessToken: string;
    }
  }

  export namespace Contact {
    export type Single = ContactEntity.JSON;
  }

  export namespace ProductionOrder {

    type ProcessingPhaseResume = {
      _id: string;
      isPrinting: boolean;
      isBindering: boolean;
      isDone: boolean;
      timeTracks: TimeTrackResume[];
      totalTime: number;
    };

    type TimeTrackResume = {
      _id: string;
      startTime: number;
      pauses: any[];
      endTime: number;
    };

    export interface SingleResume {
      _id: string;

      customer: APIResponse<Registry.Lookup>;

      deliveryDate: number;

      projectManager: APIResponse<UserEntity.Lookup>;

      commercialManager: APIResponse<UserEntity.Lookup>;

      name: string;

      openedAt: number;

      year: number;

      number: number;

      code: string;

      extraCosts: APIResponse<ProductionOrderEntity.Document['extraCosts']>[];

      extraCostsValue: number;

      productionItemsCount: number;

      deliveredProductionItemsCount: number;

      printingProcessingPhases: ProcessingPhaseResume[];

      binderingProcessingPhases: ProcessingPhaseResume[];

      totalProductionItemsValue: number;

      totalInvoicedValue: number;

      overallValue: number;

      hasManualOverallValue: boolean;

      totalOverallValue: number;

      fullyDelivered: boolean;

      hasExtraCostsWarning: boolean;
    }

  }

  export namespace Registry {
    export type Lookup = RegistryEntity.Lookup;

    export type Single = RegistryEntity.JSON;

    export type SingleDetailed = APIResponse<Populated<RegistryEntity.Document, 'contacts'>>;

    export type SingleLean = Pick<RegistryEntity.JSON, '_id' | 'name' | 'subName' | 'isActiveCustomer' | 'isActiveSupplier' | 'headOffice' | 'fiscalCode' | 'vatNumber'>;

    export type List = Single[];

    export type LeanList = SingleLean[];
  }

}
