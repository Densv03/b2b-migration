import { Subject } from "rxjs";

export type NgxChanges<Component extends object, Props = ExcludeFunctions<Component>> = {
  [Key in keyof Props]: {
    previousValue: Props[Key];
    currentValue: Props[Key];
    firstChange: boolean;
    isFirstChange(): boolean;
  };
};

type ExcludeFunctions<T extends object> = Pick<T, ExcludeFunctionPropertyNames<T>>;

type ExcludeFunctionPropertyNames<T extends object> = MarkFunctionPropertyNames<T>[keyof T];

type MarkFunctionPropertyNames<Component> = {
  [Key in keyof Component]: Component[Key] extends Function | Subject<any> ? never : Key;
};
