export type CpnBProps = {
    propsA: string;
    propsB: number;
    propsC: 'aaa' | 'bbb' | 'ccc';
};

export interface CpnBEmits {
    (event: 'start'): void;
    (event: 'finish'): void;
    (event: 'end'): void;
}