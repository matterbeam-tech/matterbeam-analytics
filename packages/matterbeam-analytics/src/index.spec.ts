import { describe, expect, test, vi } from "vitest";

import matterbeam from ".";

const config = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  customer: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

describe("matterbeam-analytics", () => {
  test("should export a function", () => {
    expect(matterbeam).toBeInstanceOf(Function);
  });

  test("should return an object", () => {
    const analytics = matterbeam(config);
    expect(analytics).toBeInstanceOf(Object);
  });

  describe("#identify", () => {
    test("should call the internal analytics.identify method", () => {
      const analytics = matterbeam(config);

      const spy = vi.spyOn(analytics._analytics, "identify");
      analytics.identify("test_user_id", { foo: "bar" });

      expect(spy).toHaveBeenCalledWith("test_user_id", { foo: "bar" });
    });
  });

  describe("#page", () => {
    test("should call the internal analytics.page method", () => {
      const analytics = matterbeam(config);

      const spy = vi.spyOn(analytics._analytics, "page");
      analytics.page();

      expect(spy).toHaveBeenCalled();
    });

    test("should call the internal analytics.page method with properties", () => {
      const analytics = matterbeam(config);

      const spy = vi.spyOn(analytics._analytics, "page");
      analytics.page({ foo: "bar" });

      expect(spy).toHaveBeenCalledWith({ foo: "bar" });
    });
  });

  describe("#track", () => {
    test("should call the internal analytics.track method", () => {
      const analytics = matterbeam(config);

      const spy = vi.spyOn(analytics._analytics, "track");
      analytics.track("test_event", { foo: "bar" });

      expect(spy).toHaveBeenCalledWith("test_event", { foo: "bar" });
    });
  });
});
