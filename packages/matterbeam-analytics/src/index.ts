import Analytics from "analytics";
import {
  matterbeam as plugin,
  type PluginConfig,
} from "analytics-plugin-matterbeam";

export type MatterbeamConfig = PluginConfig;

/**
 * Matterbeam analytics library configuration
 *
 * @param {object} config config object
 * @param {string} [config.apiKey] Matterbeam public API key
 * @param {string} [config.customer] Matterbeam customer id
 *
 * @example
 *
 * import mb from "matterbeam-analytics";
 *
 * const analytics = mb({
 *   apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 *   customer: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 * });
 */
export default function matterbeam(config: MatterbeamConfig) {
  const _analytics = Analytics({
    app: "matterbeam-analytics",
    plugins: [plugin(config)],
  });

  const identify = (userId: string, traits: Record<string, unknown>) => {
    _analytics.identify(userId, traits);
  };

  const track = (event: string, properties: Record<string, unknown>) => {
    _analytics.track(event, properties);
  };

  const page = (properties?: Record<string, unknown>) => {
    _analytics.page(properties);
  };

  return { _analytics, identify, track, page };
}
