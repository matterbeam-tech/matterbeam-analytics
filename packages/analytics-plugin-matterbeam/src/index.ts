import type { AnalyticsInstance, AnalyticsPlugin } from "analytics";

import { fetch } from "./fetch";

/**
 * Matterbeam analytics plugin
 *
 * @link https://matterbeam.com
 * @link https://getanalytics.io
 *
 * @param {object} config Plugin configuration object
 * @param {string} [config.apiKey] Matterbeam public API key
 * @param {string} [config.customer] Matterbeam customer id
 *
 * @returns {*}
 *
 * @example
 *
 * import analytics from 'analytics';
 * import matterbeam from 'analytics-plugin-matterbeam';
 *
 * analytics({})
 *   plugins: [matterbeam({ apiKey: "", customer: "" })],
 * });
 */
export const matterbeam = (config: PluginConfig): MatterbeamPlugin => {
  const captureUrl = `https://${config.customer}-api.matterbeam.com/clickstream/capture`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.apiKey}`,
  };

  return {
    name: "matterbeam",
    config: { ...config },

    methods: {
      capture: async (data) => {
        try {
          await fetch(captureUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
          });
        } catch (err) {
          console.error(err);
        }
      },
    },

    identify: ({ instance, payload }) => {
      const { capture } = instance.plugins.matterbeam;

      const { userId, traits } = payload;
      const data = { id: userId, ...traits };
      capture(data);
    },

    page: ({ instance, payload }) => {
      const { capture } = instance.plugins.matterbeam;

      const data = { type: payload.type, ...payload.properties };
      capture(data);
    },

    track: ({ instance, payload }) => {
      const { capture } = instance.plugins.matterbeam;

      const data = {
        event: payload.event,
        properties: payload.properties,
        type: payload.type,
      };
      capture(data);
    },
  };
};

export type EventFn<TConfig = Record<string, unknown>> = (
  data: EventFnData<TConfig>,
  options?: Record<string, unknown>,
) => void;

export interface EventFnData<TConfig = Record<string, unknown>> {
  config: TConfig;
  instance: Instance;
  payload: EventPayload;
}

export interface EventPayload {
  event: string;
  meta: Record<string, unknown>;
  options: Record<string, unknown>;
  properties: Record<string, unknown>;
  type: "page" | "track";
}

export type IdentifyFn<TConfig = Record<string, unknown>> = (
  data: IdentifyFnData<TConfig>,
  options?: Record<string, unknown>,
) => void;

export interface IdentifyFnData<TConfig = Record<string, unknown>> {
  config: TConfig;
  instance: Instance;
  payload: IdentifyPayload;
}

export interface IdentifyPayload {
  meta: Record<string, unknown>;
  traits: Record<string, unknown>;
  userId: string;
  type: "identify";
}

export interface Instance extends Omit<AnalyticsInstance, "plugins"> {
  plugins: {
    matterbeam: PluginMethods;
  };
}

interface MatterbeamPlugin extends AnalyticsPlugin {
  config: PluginConfig;
  methods: PluginMethods;

  page: EventFn<EventPayload>;
  identify: IdentifyFn<IdentifyPayload>;
  track: EventFn<EventPayload>;
}

export interface PluginConfig {
  enabled?: boolean;

  apiKey: string;
  customer: string;
}

export interface PluginMethods {
  capture: (data: Record<string, unknown>) => Promise<void>;
}
