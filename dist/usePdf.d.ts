export declare const usePdf: () => {
    pdfImgs: string[];
    isLoading: boolean;
    isError: boolean;
    getPdfImg: (url: string) => Promise<void>;
};
