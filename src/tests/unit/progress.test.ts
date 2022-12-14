import { RequestProgress } from "../../";
import * as data from "./sampledata";

describe("RequestProgress", () => {
  describe("#processResponse()", () => {
    it("processes an initial WORKING response", () => {
      // Create the progress object
      var progress = new RequestProgress(data.request.LIST);

      expect(progress.numWorking()).toEqual(0);

      // Process a WORKING response
      progress.processResponse(data.response.WORKING);

      expect(progress.numWorking()).toEqual(1);
    });

    it("updates after a second WORKING response", () => {
      // Create the progress object
      var progress = new RequestProgress(data.request.LIST);

      expect(progress.numWorking()).toEqual(0);

      // Process a WORKING response
      progress.processResponse(data.response.WORKING);

      expect(progress.numWorking()).toEqual(1);

      progress.processResponse(data.response.WORKING);

      // Should still be one since it was for the same scope
      expect(progress.numWorking()).toEqual(1);
    });

    it("marks as done after a COMPLETE response", () => {
      // Create the progress object
      var progress = new RequestProgress(data.request.LIST);

      progress.processResponse(data.response.WORKING);

      expect(progress.numWorking()).toEqual(1);

      progress.processResponse(data.response.COMPLETE);

      expect(progress.numWorking()).toEqual(0);
    });

    it("marks as failed if FAILED response", () => {
      var progress = new RequestProgress(data.request.LIST);

      progress.processResponse(data.response.WORKING);

      expect(progress.numWorking()).toEqual(1);
      expect(progress.numFailed()).toEqual(0);

      progress.processResponse(data.response.ERROR);

      expect(progress.numWorking()).toEqual(0);
      expect(progress.numFailed()).toEqual(1);
      expect(progress.allDone()).toEqual(true);
    });

    it("marks as done after a CANCELLED response", () => {
      // Create the progress object
      var progress = new RequestProgress(data.request.LIST);

      progress.processResponse(data.response.WORKING);

      expect(progress.numWorking()).toEqual(1);

      progress.processResponse(data.response.CANCELLED);

      expect(progress.numWorking()).toEqual(0);
      expect(progress.numCancelled()).toEqual(1);
      expect(progress.allDone()).toEqual(true);
    });
  });

  describe("#waitForCompletion()", () => {
    it("should complete successfully", async () => {
      var progress = new RequestProgress(data.request.LIST);

      progress.processResponse(data.response.WORKING);
      progress.processResponse(data.response.COMPLETE);

      var result = await progress.waitForCompletion();

      expect(result).toEqual("done");
      expect(progress.percentComplete()).toEqual(100);
    });

    it("should timeout successfully", async () => {
      var progress = new RequestProgress(data.request.LIST);

      var result = await progress.waitForCompletion(100);

      progress.cancel();

      expect(result).toEqual("timeout");
    });

    it("should stall successfully", async () => {
      var progress = new RequestProgress(data.request.LIST, 10);

      progress.processResponse(data.response.WORKING);

      await new Promise((resolve) => setTimeout(resolve, 150));

      expect(progress.numStalled()).toEqual(1);
    });
  });
});
