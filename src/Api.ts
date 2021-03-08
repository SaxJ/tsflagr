/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/api/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams = (secure && this.securityWorker && (await this.securityWorker(this.securityData))) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
        .then((data) => {
          if (r.ok) {
            r.data = data;
          } else {
            r.error = data;
          }
          return r;
        })
        .catch((e) => {
          r.error = e;
          return r;
        });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Flagr
 * @version 1.1.12
 * @baseUrl /api/v1
 *
 * Flagr is a feature flagging, A/B testing and dynamic configuration microservice. The base path for all the APIs is "/api/v1".
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  flags = {
    /**
     * No description
     *
     * @tags flag
     * @name FindFlags
     * @request GET:/flags
     */
    findFlags: (
      query?: {
        limit?: number;
        enabled?: boolean;
        description?: string;
        tags?: string;
        description_like?: string;
        key?: string;
        offset?: number;
        preload?: boolean;
        deleted?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Flag[], Error>({
        path: `/flags`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags flag
     * @name CreateFlag
     * @request POST:/flags
     */
    createFlag: (body: CreateFlagRequest, params: RequestParams = {}) =>
      this.request<Flag, Error>({
        path: `/flags`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags flag
     * @name GetFlag
     * @request GET:/flags/{flagID}
     */
    getFlag: (flagId: number, params: RequestParams = {}) =>
      this.request<Flag, Error>({
        path: `/flags/${flagId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags flag
     * @name DeleteFlag
     * @request DELETE:/flags/{flagID}
     */
    deleteFlag: (flagId: number, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/flags/${flagId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags flag
     * @name PutFlag
     * @request PUT:/flags/{flagID}
     */
    putFlag: (flagId: number, body: PutFlagRequest, params: RequestParams = {}) =>
      this.request<Flag, Error>({
        path: `/flags/${flagId}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags flag
     * @name RestoreFlag
     * @request PUT:/flags/{flagID}/restore
     */
    restoreFlag: (flagId: number, params: RequestParams = {}) =>
      this.request<Flag, Error>({
        path: `/flags/${flagId}/restore`,
        method: "PUT",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags flag
     * @name SetFlagEnabled
     * @request PUT:/flags/{flagID}/enabled
     */
    setFlagEnabled: (flagId: number, body: SetFlagEnabledRequest, params: RequestParams = {}) =>
      this.request<Flag, Error>({
        path: `/flags/${flagId}/enabled`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tag
     * @name FindTags
     * @request GET:/flags/{flagID}/tags
     */
    findTags: (flagId: number, params: RequestParams = {}) =>
      this.request<Tag[], Error>({
        path: `/flags/${flagId}/tags`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tag
     * @name CreateTag
     * @request POST:/flags/{flagID}/tags
     */
    createTag: (flagId: number, body: CreateTagRequest, params: RequestParams = {}) =>
      this.request<Tag, Error>({
        path: `/flags/${flagId}/tags`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tag
     * @name DeleteTag
     * @request DELETE:/flags/{flagID}/tags/{tagID}
     */
    deleteTag: (flagId: number, tagId: number, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/flags/${flagId}/tags/${tagId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags variant
     * @name FindVariants
     * @request GET:/flags/{flagID}/variants
     */
    findVariants: (flagId: number, params: RequestParams = {}) =>
      this.request<Variant[], Error>({
        path: `/flags/${flagId}/variants`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags variant
     * @name CreateVariant
     * @request POST:/flags/{flagID}/variants
     */
    createVariant: (flagId: number, body: CreateVariantRequest, params: RequestParams = {}) =>
      this.request<Variant, Error>({
        path: `/flags/${flagId}/variants`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags variant
     * @name PutVariant
     * @request PUT:/flags/{flagID}/variants/{variantID}
     */
    putVariant: (flagId: number, variantId: number, body: PutVariantRequest, params: RequestParams = {}) =>
      this.request<Variant, Error>({
        path: `/flags/${flagId}/variants/${variantId}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags variant
     * @name DeleteVariant
     * @request DELETE:/flags/{flagID}/variants/{variantID}
     */
    deleteVariant: (flagId: number, variantId: number, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/flags/${flagId}/variants/${variantId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags segment
     * @name FindSegments
     * @request GET:/flags/{flagID}/segments
     */
    findSegments: (flagId: number, params: RequestParams = {}) =>
      this.request<Segment[], Error>({
        path: `/flags/${flagId}/segments`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags segment
     * @name CreateSegment
     * @request POST:/flags/{flagID}/segments
     */
    createSegment: (flagId: number, body: CreateSegmentRequest, params: RequestParams = {}) =>
      this.request<Segment, Error>({
        path: `/flags/${flagId}/segments`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags segment
     * @name PutSegmentsReorder
     * @request PUT:/flags/{flagID}/segments/reorder
     */
    putSegmentsReorder: (flagId: number, body: PutSegmentReorderRequest, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/flags/${flagId}/segments/reorder`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags segment
     * @name PutSegment
     * @request PUT:/flags/{flagID}/segments/{segmentID}
     */
    putSegment: (flagId: number, segmentId: number, body: PutSegmentRequest, params: RequestParams = {}) =>
      this.request<Segment, Error>({
        path: `/flags/${flagId}/segments/${segmentId}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags segment
     * @name DeleteSegment
     * @request DELETE:/flags/{flagID}/segments/{segmentID}
     */
    deleteSegment: (flagId: number, segmentId: number, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/flags/${flagId}/segments/${segmentId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags constraint
     * @name FindConstraints
     * @request GET:/flags/{flagID}/segments/{segmentID}/constraints
     */
    findConstraints: (flagId: number, segmentId: number, params: RequestParams = {}) =>
      this.request<Constraint[], Error>({
        path: `/flags/${flagId}/segments/${segmentId}/constraints`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags constraint
     * @name CreateConstraint
     * @request POST:/flags/{flagID}/segments/{segmentID}/constraints
     */
    createConstraint: (flagId: number, segmentId: number, body: CreateConstraintRequest, params: RequestParams = {}) =>
      this.request<Constraint, Error>({
        path: `/flags/${flagId}/segments/${segmentId}/constraints`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags constraint
     * @name PutConstraint
     * @request PUT:/flags/{flagID}/segments/{segmentID}/constraints/{constraintID}
     */
    putConstraint: (
      flagId: number,
      segmentId: number,
      constraintId: number,
      body: CreateConstraintRequest,
      params: RequestParams = {},
    ) =>
      this.request<Constraint, Error>({
        path: `/flags/${flagId}/segments/${segmentId}/constraints/${constraintId}`,
        method: "PUT",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags constraint
     * @name DeleteConstraint
     * @request DELETE:/flags/{flagID}/segments/{segmentID}/constraints/{constraintID}
     */
    deleteConstraint: (flagId: number, segmentId: number, constraintId: number, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/flags/${flagId}/segments/${segmentId}/constraints/${constraintId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags distribution
     * @name FindDistributions
     * @request GET:/flags/{flagID}/segments/{segmentID}/distributions
     */
    findDistributions: (flagId: number, segmentId: number, params: RequestParams = {}) =>
      this.request<Distribution[], Error>({
        path: `/flags/${flagId}/segments/${segmentId}/distributions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description replace the distribution with the new setting
     *
     * @tags distribution
     * @name PutDistributions
     * @request PUT:/flags/{flagID}/segments/{segmentID}/distributions
     */
    putDistributions: (flagId: number, segmentId: number, body: PutDistributionsRequest, params: RequestParams = {}) =>
      this.request<Distribution[], Error>({
        path: `/flags/${flagId}/segments/${segmentId}/distributions`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags flag
     * @name GetFlagSnapshots
     * @request GET:/flags/{flagID}/snapshots
     */
    getFlagSnapshots: (flagId: number, params: RequestParams = {}) =>
      this.request<FlagSnapshot[], Error>({
        path: `/flags/${flagId}/snapshots`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags flag
     * @name GetFlagEntityTypes
     * @request GET:/flags/entity_types
     */
    getFlagEntityTypes: (params: RequestParams = {}) =>
      this.request<string[], Error>({
        path: `/flags/entity_types`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  tags = {
    /**
     * No description
     *
     * @tags tag
     * @name FindAllTags
     * @request GET:/tags
     */
    findAllTags: (query?: { limit?: number; offset?: number; value_like?: string }, params: RequestParams = {}) =>
      this.request<Tag[], Error>({
        path: `/tags`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  evaluation = {
    /**
     * No description
     *
     * @tags evaluation
     * @name PostEvaluation
     * @request POST:/evaluation
     */
    postEvaluation: (body: EvalContext, params: RequestParams = {}) =>
      this.request<EvalResult, Error>({
        path: `/evaluation`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags evaluation
     * @name PostEvaluationBatch
     * @request POST:/evaluation/batch
     */
    postEvaluationBatch: (body: EvaluationBatchRequest, params: RequestParams = {}) =>
      this.request<EvaluationBatchResponse, Error>({
        path: `/evaluation/batch`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  health = {
    /**
     * @description Check if Flagr is healthy
     *
     * @tags health
     * @name GetHealth
     * @request GET:/health
     */
    getHealth: (params: RequestParams = {}) =>
      this.request<Health, Error>({
        path: `/health`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  export = {
    /**
     * @description Export sqlite3 format of the db dump, which is converted from the main database.
     *
     * @tags export
     * @name GetExportSqlite
     * @request GET:/export/sqlite
     */
    getExportSqlite: (query?: { exclude_snapshots?: boolean }, params: RequestParams = {}) =>
      this.request<File, Error>({
        path: `/export/sqlite`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Export JSON format of the eval cache dump
     *
     * @tags export
     * @name GetExportEvalCacheJson
     * @request GET:/export/eval_cache/json
     */
    getExportEvalCacheJson: (params: RequestParams = {}) =>
      this.request<object, Error>({
        path: `/export/eval_cache/json`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
