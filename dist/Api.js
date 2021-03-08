"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.HttpClient = exports.ContentType = void 0;
var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
class HttpClient {
    constructor(apiConfig = {}) {
        this.baseUrl = "/api/v1";
        this.securityData = null;
        this.abortControllers = new Map();
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.contentFormatters = {
            [ContentType.Json]: (input) => input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            [ContentType.FormData]: (input) => Object.keys(input || {}).reduce((data, key) => {
                data.append(key, input[key]);
                return data;
            }, new FormData()),
            [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
        };
        this.createAbortSignal = (cancelToken) => {
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
        this.abortRequest = (cancelToken) => {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        };
        this.request = (_a) => __awaiter(this, void 0, void 0, function* () {
            var { body, secure, path, type, query, format = "json", baseUrl, cancelToken } = _a, params = __rest(_a, ["body", "secure", "path", "type", "query", "format", "baseUrl", "cancelToken"]);
            const secureParams = (secure && this.securityWorker && (yield this.securityWorker(this.securityData))) || {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const queryString = query && this.toQueryString(query);
            const payloadFormatter = this.contentFormatters[type || ContentType.Json];
            return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, Object.assign(Object.assign({}, requestParams), { headers: Object.assign(Object.assign({}, (type && type !== ContentType.FormData ? { "Content-Type": type } : {})), (requestParams.headers || {})), signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0, body: typeof body === "undefined" || body === null ? null : payloadFormatter(body) })).then((response) => __awaiter(this, void 0, void 0, function* () {
                const r = response;
                r.data = null;
                r.error = null;
                const data = yield response[format]()
                    .then((data) => {
                    if (r.ok) {
                        r.data = data;
                    }
                    else {
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
                if (!response.ok)
                    throw data;
                return data;
            }));
        });
        Object.assign(this, apiConfig);
    }
    addQueryParam(query, key) {
        const value = query[key];
        return (encodeURIComponent(key) +
            "=" +
            encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`));
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => typeof query[key] === "object" && !Array.isArray(query[key])
            ? this.toQueryString(query[key])
            : this.addQueryParam(query, key))
            .join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    mergeRequestParams(params1, params2) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, this.baseApiParams), params1), (params2 || {})), { headers: Object.assign(Object.assign(Object.assign({}, (this.baseApiParams.headers || {})), (params1.headers || {})), ((params2 && params2.headers) || {})) });
    }
}
exports.HttpClient = HttpClient;
/**
 * @title Flagr
 * @version 1.1.12
 * @baseUrl /api/v1
 *
 * Flagr is a feature flagging, A/B testing and dynamic configuration microservice. The base path for all the APIs is "/api/v1".
 */
class Api extends HttpClient {
    constructor() {
        super(...arguments);
        this.flags = {
            /**
             * No description
             *
             * @tags flag
             * @name FindFlags
             * @request GET:/flags
             */
            findFlags: (query, params = {}) => this.request(Object.assign({ path: `/flags`, method: "GET", query: query, format: "json" }, params)),
            /**
             * No description
             *
             * @tags flag
             * @name CreateFlag
             * @request POST:/flags
             */
            createFlag: (body, params = {}) => this.request(Object.assign({ path: `/flags`, method: "POST", body: body, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @tags flag
             * @name GetFlag
             * @request GET:/flags/{flagID}
             */
            getFlag: (flagId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}`, method: "GET", format: "json" }, params)),
            /**
             * No description
             *
             * @tags flag
             * @name DeleteFlag
             * @request DELETE:/flags/{flagID}
             */
            deleteFlag: (flagId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}`, method: "DELETE" }, params)),
            /**
             * No description
             *
             * @tags flag
             * @name PutFlag
             * @request PUT:/flags/{flagID}
             */
            putFlag: (flagId, body, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}`, method: "PUT", body: body, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @tags flag
             * @name RestoreFlag
             * @request PUT:/flags/{flagID}/restore
             */
            restoreFlag: (flagId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/restore`, method: "PUT", format: "json" }, params)),
            /**
             * No description
             *
             * @tags flag
             * @name SetFlagEnabled
             * @request PUT:/flags/{flagID}/enabled
             */
            setFlagEnabled: (flagId, body, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/enabled`, method: "PUT", body: body, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @tags tag
             * @name FindTags
             * @request GET:/flags/{flagID}/tags
             */
            findTags: (flagId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/tags`, method: "GET", format: "json" }, params)),
            /**
             * No description
             *
             * @tags tag
             * @name CreateTag
             * @request POST:/flags/{flagID}/tags
             */
            createTag: (flagId, body, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/tags`, method: "POST", body: body, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @tags tag
             * @name DeleteTag
             * @request DELETE:/flags/{flagID}/tags/{tagID}
             */
            deleteTag: (flagId, tagId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/tags/${tagId}`, method: "DELETE" }, params)),
            /**
             * No description
             *
             * @tags variant
             * @name FindVariants
             * @request GET:/flags/{flagID}/variants
             */
            findVariants: (flagId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/variants`, method: "GET", format: "json" }, params)),
            /**
             * No description
             *
             * @tags variant
             * @name CreateVariant
             * @request POST:/flags/{flagID}/variants
             */
            createVariant: (flagId, body, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/variants`, method: "POST", body: body, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @tags variant
             * @name PutVariant
             * @request PUT:/flags/{flagID}/variants/{variantID}
             */
            putVariant: (flagId, variantId, body, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/variants/${variantId}`, method: "PUT", body: body, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @tags variant
             * @name DeleteVariant
             * @request DELETE:/flags/{flagID}/variants/{variantID}
             */
            deleteVariant: (flagId, variantId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/variants/${variantId}`, method: "DELETE" }, params)),
            /**
             * No description
             *
             * @tags segment
             * @name FindSegments
             * @request GET:/flags/{flagID}/segments
             */
            findSegments: (flagId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/segments`, method: "GET", format: "json" }, params)),
            /**
             * No description
             *
             * @tags segment
             * @name CreateSegment
             * @request POST:/flags/{flagID}/segments
             */
            createSegment: (flagId, body, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/segments`, method: "POST", body: body, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @tags segment
             * @name PutSegmentsReorder
             * @request PUT:/flags/{flagID}/segments/reorder
             */
            putSegmentsReorder: (flagId, body, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/segments/reorder`, method: "PUT", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags segment
             * @name PutSegment
             * @request PUT:/flags/{flagID}/segments/{segmentID}
             */
            putSegment: (flagId, segmentId, body, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/segments/${segmentId}`, method: "PUT", body: body, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @tags segment
             * @name DeleteSegment
             * @request DELETE:/flags/{flagID}/segments/{segmentID}
             */
            deleteSegment: (flagId, segmentId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/segments/${segmentId}`, method: "DELETE" }, params)),
            /**
             * No description
             *
             * @tags constraint
             * @name FindConstraints
             * @request GET:/flags/{flagID}/segments/{segmentID}/constraints
             */
            findConstraints: (flagId, segmentId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/segments/${segmentId}/constraints`, method: "GET", format: "json" }, params)),
            /**
             * No description
             *
             * @tags constraint
             * @name CreateConstraint
             * @request POST:/flags/{flagID}/segments/{segmentID}/constraints
             */
            createConstraint: (flagId, segmentId, body, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/segments/${segmentId}/constraints`, method: "POST", body: body, format: "json" }, params)),
            /**
             * No description
             *
             * @tags constraint
             * @name PutConstraint
             * @request PUT:/flags/{flagID}/segments/{segmentID}/constraints/{constraintID}
             */
            putConstraint: (flagId, segmentId, constraintId, body, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/segments/${segmentId}/constraints/${constraintId}`, method: "PUT", body: body, format: "json" }, params)),
            /**
             * No description
             *
             * @tags constraint
             * @name DeleteConstraint
             * @request DELETE:/flags/{flagID}/segments/{segmentID}/constraints/{constraintID}
             */
            deleteConstraint: (flagId, segmentId, constraintId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/segments/${segmentId}/constraints/${constraintId}`, method: "DELETE" }, params)),
            /**
             * No description
             *
             * @tags distribution
             * @name FindDistributions
             * @request GET:/flags/{flagID}/segments/{segmentID}/distributions
             */
            findDistributions: (flagId, segmentId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/segments/${segmentId}/distributions`, method: "GET", format: "json" }, params)),
            /**
             * @description replace the distribution with the new setting
             *
             * @tags distribution
             * @name PutDistributions
             * @request PUT:/flags/{flagID}/segments/{segmentID}/distributions
             */
            putDistributions: (flagId, segmentId, body, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/segments/${segmentId}/distributions`, method: "PUT", body: body, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @tags flag
             * @name GetFlagSnapshots
             * @request GET:/flags/{flagID}/snapshots
             */
            getFlagSnapshots: (flagId, params = {}) => this.request(Object.assign({ path: `/flags/${flagId}/snapshots`, method: "GET", format: "json" }, params)),
            /**
             * No description
             *
             * @tags flag
             * @name GetFlagEntityTypes
             * @request GET:/flags/entity_types
             */
            getFlagEntityTypes: (params = {}) => this.request(Object.assign({ path: `/flags/entity_types`, method: "GET", format: "json" }, params)),
        };
        this.tags = {
            /**
             * No description
             *
             * @tags tag
             * @name FindAllTags
             * @request GET:/tags
             */
            findAllTags: (query, params = {}) => this.request(Object.assign({ path: `/tags`, method: "GET", query: query, format: "json" }, params)),
        };
        this.evaluation = {
            /**
             * No description
             *
             * @tags evaluation
             * @name PostEvaluation
             * @request POST:/evaluation
             */
            postEvaluation: (body, params = {}) => this.request(Object.assign({ path: `/evaluation`, method: "POST", body: body, type: ContentType.Json, format: "json" }, params)),
            /**
             * No description
             *
             * @tags evaluation
             * @name PostEvaluationBatch
             * @request POST:/evaluation/batch
             */
            postEvaluationBatch: (body, params = {}) => this.request(Object.assign({ path: `/evaluation/batch`, method: "POST", body: body, type: ContentType.Json, format: "json" }, params)),
        };
        this.health = {
            /**
             * @description Check if Flagr is healthy
             *
             * @tags health
             * @name GetHealth
             * @request GET:/health
             */
            getHealth: (params = {}) => this.request(Object.assign({ path: `/health`, method: "GET", format: "json" }, params)),
        };
        this.export = {
            /**
             * @description Export sqlite3 format of the db dump, which is converted from the main database.
             *
             * @tags export
             * @name GetExportSqlite
             * @request GET:/export/sqlite
             */
            getExportSqlite: (query, params = {}) => this.request(Object.assign({ path: `/export/sqlite`, method: "GET", query: query }, params)),
            /**
             * @description Export JSON format of the eval cache dump
             *
             * @tags export
             * @name GetExportEvalCacheJson
             * @request GET:/export/eval_cache/json
             */
            getExportEvalCacheJson: (params = {}) => this.request(Object.assign({ path: `/export/eval_cache/json`, method: "GET", format: "json" }, params)),
        };
    }
}
exports.Api = Api;
