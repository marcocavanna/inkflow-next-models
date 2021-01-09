import { RegistryEntity, UserEntity } from '../entity';
import { APIResponse } from '../generic';


export namespace Response {

  export namespace Auth {
    export interface Login {
      userData: APIResponse<Omit<UserEntity.JSON, 'password'>>;

      accessToken: string;
    }
  }

  export namespace Registry {
    export type Single = RegistryEntity.JSON;

    export type SingleLean = Pick<RegistryEntity.JSON, '_id' | 'name' | 'subName' | 'isActiveCustomer' | 'isActiveSupplier' | 'headOffice' | 'fiscalCode' | 'vatNumber'>;

    export type List = Single[];

    export type LeanList = SingleLean[];
  }

}
