export declare class SideDrawer {
    showContactTab: boolean;
    titletext: string;
    opened: boolean;
    open(): Promise<void>;
    close(): Promise<void>;
    render(): any[];
    private onContentChange;
}
