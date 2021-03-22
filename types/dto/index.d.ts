import { DtoType } from './_utils';


export namespace Dto {

  export namespace ProductionOrder {
    export interface Filter {
      projectManager?: string;

      status?: 'open' | 'closed'
    }
  }

  export namespace Operator {
    export interface Manage {
      firstName: string;

      lastName: DtoType.Nullable<string>;

      isAdmin: boolean;

      isBinder: boolean;

      isDeliveryMan: boolean;

      isPrinter: boolean;

      PIN: string;
    }
  }

  export namespace User {
    export interface Create {
      email: string;

      isCommercialManager?: boolean;

      isProjectManager?: boolean;

      name: string;

      password: string;

      surname?: string;
    }

    export interface Login {
      email: string;

      password: string;
    }
  }
}
