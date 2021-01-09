export namespace Dto {
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
