export interface Flag {
    /**
     * @format int64
     * @min 1
     */
    id?: number;
    /** unique key representation of the flag */
    key?: string;
    description: string;
    enabled: boolean;
    tags?: Tag[];
    segments?: Segment[];
    variants?: Variant[];
    /** enabled data records will get data logging in the metrics pipeline, for example, kafka. */
    dataRecordsEnabled: boolean;
    /** it will override the entityType in the evaluation logs if it's not empty */
    entityType?: string;
    /** flag usage details in markdown format */
    notes?: string;
    createdBy?: string;
    updatedBy?: string;
    /** @format date-time */
    updatedAt?: string;
}
export interface CreateFlagRequest {
    description: string;
    /** unique key representation of the flag */
    key?: string;
    /** template for flag creation */
    template?: string;
}
export interface PutFlagRequest {
    description?: string | null;
    /** enabled data records will get data logging in the metrics pipeline, for example, kafka. */
    dataRecordsEnabled?: boolean | null;
    /** it will overwrite entityType into evaluation logs if it's not empty */
    entityType?: string | null;
    enabled?: boolean | null;
    key?: string | null;
    notes?: string | null;
}
export interface SetFlagEnabledRequest {
    enabled: boolean;
}
export interface FlagSnapshot {
    /**
     * @format int64
     * @min 1
     */
    id: number;
    updatedBy?: string;
    flag: Flag;
    updatedAt: string;
}
export interface Tag {
    /**
     * @format int64
     * @min 1
     */
    id?: number;
    value: string;
}
export interface CreateTagRequest {
    value: string;
}
export interface Segment {
    /**
     * @format int64
     * @min 1
     */
    id?: number;
    description: string;
    constraints?: Constraint[];
    distributions?: Distribution[];
    /**
     * @format int64
     * @min 0
     */
    rank: number;
    /**
     * @format int64
     * @min 0
     * @max 100
     */
    rolloutPercent: number;
}
export interface CreateSegmentRequest {
    description: string;
    /**
     * @format int64
     * @min 0
     * @max 100
     */
    rolloutPercent: number;
}
export interface PutSegmentRequest {
    description: string;
    /**
     * @format int64
     * @min 0
     * @max 100
     */
    rolloutPercent: number;
}
export interface PutSegmentReorderRequest {
    segmentIDs: number[];
}
export interface Variant {
    /**
     * @format int64
     * @min 1
     */
    id?: number;
    key: string;
    attachment?: object;
}
export interface CreateVariantRequest {
    key: string;
    attachment?: object;
}
export interface PutVariantRequest {
    key: string;
    attachment?: object;
}
export interface Constraint {
    /**
     * @format int64
     * @min 1
     */
    id?: number;
    property: string;
    operator: "EQ" | "NEQ" | "LT" | "LTE" | "GT" | "GTE" | "EREG" | "NEREG" | "IN" | "NOTIN" | "CONTAINS" | "NOTCONTAINS";
    value: string;
}
export interface CreateConstraintRequest {
    property: string;
    operator: string;
    value: string;
}
export interface Distribution {
    /**
     * @format int64
     * @min 1
     */
    id?: number;
    /**
     * @format int64
     * @min 0
     * @max 100
     */
    percent: number;
    variantKey: string;
    /**
     * @format int64
     * @min 1
     */
    variantID: number;
}
export interface PutDistributionsRequest {
    distributions: Distribution[];
}
export interface EvalContext {
    /** entityID is used to deterministically at random to evaluate the flag result. If it's empty, flagr will randomly generate one. */
    entityID?: string;
    entityType?: string;
    entityContext?: object;
    enableDebug?: boolean;
    /**
     * flagID
     * @format int64
     * @min 1
     */
    flagID?: number;
    /** flagKey. flagID or flagKey will resolve to the same flag. Either works. */
    flagKey?: string;
    /** flagTags. flagTags looks up flags by tag. Either works. */
    flagTags?: string[];
    /** determine how flagTags is used to filter flags to be evaluated. OR extends the evaluation to those which contains at least one of the provided flagTags or AND limit the evaluation to those which contains all the flagTags. */
    flagTagsOperator?: "ANY" | "ALL";
}
export interface EvalResult {
    /** @format int64 */
    flagID?: number;
    flagKey?: string;
    /** @format int64 */
    flagSnapshotID?: number;
    /** @format int64 */
    segmentID?: number;
    /** @format int64 */
    variantID?: number;
    variantKey?: string;
    variantAttachment?: object;
    evalContext?: EvalContext;
    timestamp?: string;
    evalDebugLog?: EvalDebugLog;
}
export interface EvalDebugLog {
    segmentDebugLogs?: SegmentDebugLog[];
    msg?: string;
}
export interface SegmentDebugLog {
    /**
     * @format int64
     * @min 1
     */
    segmentID?: number;
    msg?: string;
}
export interface EvaluationEntity {
    entityID?: string;
    entityType?: string;
    entityContext?: object;
}
export interface EvaluationBatchRequest {
    entities: EvaluationEntity[];
    enableDebug?: boolean;
    /** flagIDs */
    flagIDs?: number[];
    /** flagKeys. Either flagIDs, flagKeys or flagTags works. If pass in multiples, Flagr may return duplicate results. */
    flagKeys?: string[];
    /** flagTags. Either flagIDs, flagKeys or flagTags works. If pass in multiples, Flagr may return duplicate results. */
    flagTags?: string[];
    /** determine how flagTags is used to filter flags to be evaluated. OR extends the evaluation to those which contains at least one of the provided flagTags or AND limit the evaluation to those which contains all the flagTags. */
    flagTagsOperator?: "ANY" | "ALL";
}
export interface EvaluationBatchResponse {
    evaluationResults: EvalResult[];
}
export interface Health {
    status?: string;
}
export interface Error {
    message: string;
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker?;
    private abortControllers;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    private addQueryParam;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    private mergeRequestParams;
    private createAbortSignal;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title Flagr
 * @version 1.1.12
 * @baseUrl /api/v1
 *
 * Flagr is a feature flagging, A/B testing and dynamic configuration microservice. The base path for all the APIs is "/api/v1".
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    flags: {
        /**
         * No description
         *
         * @tags flag
         * @name FindFlags
         * @request GET:/flags
         */
        findFlags: (query?: {
            limit?: number | undefined;
            enabled?: boolean | undefined;
            description?: string | undefined;
            tags?: string | undefined;
            description_like?: string | undefined;
            key?: string | undefined;
            offset?: number | undefined;
            preload?: boolean | undefined;
            deleted?: boolean | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<Flag[], Error>>;
        /**
         * No description
         *
         * @tags flag
         * @name CreateFlag
         * @request POST:/flags
         */
        createFlag: (body: CreateFlagRequest, params?: RequestParams) => Promise<HttpResponse<Flag, Error>>;
        /**
         * No description
         *
         * @tags flag
         * @name GetFlag
         * @request GET:/flags/{flagID}
         */
        getFlag: (flagId: number, params?: RequestParams) => Promise<HttpResponse<Flag, Error>>;
        /**
         * No description
         *
         * @tags flag
         * @name DeleteFlag
         * @request DELETE:/flags/{flagID}
         */
        deleteFlag: (flagId: number, params?: RequestParams) => Promise<HttpResponse<void, Error>>;
        /**
         * No description
         *
         * @tags flag
         * @name PutFlag
         * @request PUT:/flags/{flagID}
         */
        putFlag: (flagId: number, body: PutFlagRequest, params?: RequestParams) => Promise<HttpResponse<Flag, Error>>;
        /**
         * No description
         *
         * @tags flag
         * @name RestoreFlag
         * @request PUT:/flags/{flagID}/restore
         */
        restoreFlag: (flagId: number, params?: RequestParams) => Promise<HttpResponse<Flag, Error>>;
        /**
         * No description
         *
         * @tags flag
         * @name SetFlagEnabled
         * @request PUT:/flags/{flagID}/enabled
         */
        setFlagEnabled: (flagId: number, body: SetFlagEnabledRequest, params?: RequestParams) => Promise<HttpResponse<Flag, Error>>;
        /**
         * No description
         *
         * @tags tag
         * @name FindTags
         * @request GET:/flags/{flagID}/tags
         */
        findTags: (flagId: number, params?: RequestParams) => Promise<HttpResponse<Tag[], Error>>;
        /**
         * No description
         *
         * @tags tag
         * @name CreateTag
         * @request POST:/flags/{flagID}/tags
         */
        createTag: (flagId: number, body: CreateTagRequest, params?: RequestParams) => Promise<HttpResponse<Tag, Error>>;
        /**
         * No description
         *
         * @tags tag
         * @name DeleteTag
         * @request DELETE:/flags/{flagID}/tags/{tagID}
         */
        deleteTag: (flagId: number, tagId: number, params?: RequestParams) => Promise<HttpResponse<void, Error>>;
        /**
         * No description
         *
         * @tags variant
         * @name FindVariants
         * @request GET:/flags/{flagID}/variants
         */
        findVariants: (flagId: number, params?: RequestParams) => Promise<HttpResponse<Variant[], Error>>;
        /**
         * No description
         *
         * @tags variant
         * @name CreateVariant
         * @request POST:/flags/{flagID}/variants
         */
        createVariant: (flagId: number, body: CreateVariantRequest, params?: RequestParams) => Promise<HttpResponse<Variant, Error>>;
        /**
         * No description
         *
         * @tags variant
         * @name PutVariant
         * @request PUT:/flags/{flagID}/variants/{variantID}
         */
        putVariant: (flagId: number, variantId: number, body: PutVariantRequest, params?: RequestParams) => Promise<HttpResponse<Variant, Error>>;
        /**
         * No description
         *
         * @tags variant
         * @name DeleteVariant
         * @request DELETE:/flags/{flagID}/variants/{variantID}
         */
        deleteVariant: (flagId: number, variantId: number, params?: RequestParams) => Promise<HttpResponse<void, Error>>;
        /**
         * No description
         *
         * @tags segment
         * @name FindSegments
         * @request GET:/flags/{flagID}/segments
         */
        findSegments: (flagId: number, params?: RequestParams) => Promise<HttpResponse<Segment[], Error>>;
        /**
         * No description
         *
         * @tags segment
         * @name CreateSegment
         * @request POST:/flags/{flagID}/segments
         */
        createSegment: (flagId: number, body: CreateSegmentRequest, params?: RequestParams) => Promise<HttpResponse<Segment, Error>>;
        /**
         * No description
         *
         * @tags segment
         * @name PutSegmentsReorder
         * @request PUT:/flags/{flagID}/segments/reorder
         */
        putSegmentsReorder: (flagId: number, body: PutSegmentReorderRequest, params?: RequestParams) => Promise<HttpResponse<void, Error>>;
        /**
         * No description
         *
         * @tags segment
         * @name PutSegment
         * @request PUT:/flags/{flagID}/segments/{segmentID}
         */
        putSegment: (flagId: number, segmentId: number, body: PutSegmentRequest, params?: RequestParams) => Promise<HttpResponse<Segment, Error>>;
        /**
         * No description
         *
         * @tags segment
         * @name DeleteSegment
         * @request DELETE:/flags/{flagID}/segments/{segmentID}
         */
        deleteSegment: (flagId: number, segmentId: number, params?: RequestParams) => Promise<HttpResponse<void, Error>>;
        /**
         * No description
         *
         * @tags constraint
         * @name FindConstraints
         * @request GET:/flags/{flagID}/segments/{segmentID}/constraints
         */
        findConstraints: (flagId: number, segmentId: number, params?: RequestParams) => Promise<HttpResponse<Constraint[], Error>>;
        /**
         * No description
         *
         * @tags constraint
         * @name CreateConstraint
         * @request POST:/flags/{flagID}/segments/{segmentID}/constraints
         */
        createConstraint: (flagId: number, segmentId: number, body: CreateConstraintRequest, params?: RequestParams) => Promise<HttpResponse<Constraint, Error>>;
        /**
         * No description
         *
         * @tags constraint
         * @name PutConstraint
         * @request PUT:/flags/{flagID}/segments/{segmentID}/constraints/{constraintID}
         */
        putConstraint: (flagId: number, segmentId: number, constraintId: number, body: CreateConstraintRequest, params?: RequestParams) => Promise<HttpResponse<Constraint, Error>>;
        /**
         * No description
         *
         * @tags constraint
         * @name DeleteConstraint
         * @request DELETE:/flags/{flagID}/segments/{segmentID}/constraints/{constraintID}
         */
        deleteConstraint: (flagId: number, segmentId: number, constraintId: number, params?: RequestParams) => Promise<HttpResponse<void, Error>>;
        /**
         * No description
         *
         * @tags distribution
         * @name FindDistributions
         * @request GET:/flags/{flagID}/segments/{segmentID}/distributions
         */
        findDistributions: (flagId: number, segmentId: number, params?: RequestParams) => Promise<HttpResponse<Distribution[], Error>>;
        /**
         * @description replace the distribution with the new setting
         *
         * @tags distribution
         * @name PutDistributions
         * @request PUT:/flags/{flagID}/segments/{segmentID}/distributions
         */
        putDistributions: (flagId: number, segmentId: number, body: PutDistributionsRequest, params?: RequestParams) => Promise<HttpResponse<Distribution[], Error>>;
        /**
         * No description
         *
         * @tags flag
         * @name GetFlagSnapshots
         * @request GET:/flags/{flagID}/snapshots
         */
        getFlagSnapshots: (flagId: number, params?: RequestParams) => Promise<HttpResponse<FlagSnapshot[], Error>>;
        /**
         * No description
         *
         * @tags flag
         * @name GetFlagEntityTypes
         * @request GET:/flags/entity_types
         */
        getFlagEntityTypes: (params?: RequestParams) => Promise<HttpResponse<string[], Error>>;
    };
    tags: {
        /**
         * No description
         *
         * @tags tag
         * @name FindAllTags
         * @request GET:/tags
         */
        findAllTags: (query?: {
            limit?: number | undefined;
            offset?: number | undefined;
            value_like?: string | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<Tag[], Error>>;
    };
    evaluation: {
        /**
         * No description
         *
         * @tags evaluation
         * @name PostEvaluation
         * @request POST:/evaluation
         */
        postEvaluation: (body: EvalContext, params?: RequestParams) => Promise<HttpResponse<EvalResult, Error>>;
        /**
         * No description
         *
         * @tags evaluation
         * @name PostEvaluationBatch
         * @request POST:/evaluation/batch
         */
        postEvaluationBatch: (body: EvaluationBatchRequest, params?: RequestParams) => Promise<HttpResponse<EvaluationBatchResponse, Error>>;
    };
    health: {
        /**
         * @description Check if Flagr is healthy
         *
         * @tags health
         * @name GetHealth
         * @request GET:/health
         */
        getHealth: (params?: RequestParams) => Promise<HttpResponse<Health, Error>>;
    };
    export: {
        /**
         * @description Export sqlite3 format of the db dump, which is converted from the main database.
         *
         * @tags export
         * @name GetExportSqlite
         * @request GET:/export/sqlite
         */
        getExportSqlite: (query?: {
            exclude_snapshots?: boolean | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<File, Error>>;
        /**
         * @description Export JSON format of the eval cache dump
         *
         * @tags export
         * @name GetExportEvalCacheJson
         * @request GET:/export/eval_cache/json
         */
        getExportEvalCacheJson: (params?: RequestParams) => Promise<HttpResponse<object, Error>>;
    };
}
export {};
