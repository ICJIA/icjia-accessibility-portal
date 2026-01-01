import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { usePrintLinks } from "../../app/composables/usePrintLinks";
import { defineComponent, h } from "vue";

describe("usePrintLinks", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    // Create a container for our test DOM
    container = document.createElement("div");
    container.className = "print-content";
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    vi.clearAllTimers();
  });

  describe("processPrintLinks", () => {
    it("should append URL to external links", async () => {
      // Create a test component that uses the composable
      const TestComponent = defineComponent({
        setup() {
          const { processPrintLinks } = usePrintLinks();
          return { processPrintLinks };
        },
        template:
          '<div class="print-answer"><a href="https://example.com">Example Link</a></div>',
      });

      const wrapper = mount(TestComponent, {
        attachTo: container,
      });

      // Wait for mounted hook to complete
      await new Promise((resolve) => setTimeout(resolve, 600));

      const link = wrapper.find("a");
      expect(link.exists()).toBe(true);

      // Link text should include URL in parentheses
      const linkText = link.text();
      expect(linkText).toContain("Example Link");
      expect(linkText).toContain("https://example.com");

      wrapper.unmount();
    });

    it("should handle links without text by using URL", async () => {
      const TestComponent = defineComponent({
        setup() {
          const { processPrintLinks } = usePrintLinks();
          return { processPrintLinks };
        },
        template:
          '<div class="print-answer"><a href="https://example.com"></a></div>',
      });

      const wrapper = mount(TestComponent, {
        attachTo: container,
      });

      await new Promise((resolve) => setTimeout(resolve, 600));

      const link = wrapper.find("a");
      const linkText = link.text();

      // The composable sets the link text to the URL and also appends it
      // So we should expect the URL to appear in the text
      expect(linkText).toContain("https://example.com");

      wrapper.unmount();
    });

    it("should style internal links as bold text", async () => {
      const TestComponent = defineComponent({
        setup() {
          const { processPrintLinks } = usePrintLinks();
          return { processPrintLinks };
        },
        template:
          '<div class="print-answer"><a href="#section-1">Go to Section 1</a></div>',
      });

      const wrapper = mount(TestComponent, {
        attachTo: container,
      });

      await new Promise((resolve) => setTimeout(resolve, 600));

      const link = wrapper.find("a");
      expect(link.classes()).toContain("print-internal-link");
      // Internal links should have href removed
      expect(link.attributes("href")).toBeUndefined();

      wrapper.unmount();
    });

    it("should not duplicate URLs if already appended", async () => {
      const TestComponent = defineComponent({
        setup() {
          const { processPrintLinks } = usePrintLinks();
          return { processPrintLinks };
        },
        template:
          '<div class="print-answer"><a href="https://example.com">Link (https://example.com)</a></div>',
      });

      const wrapper = mount(TestComponent, {
        attachTo: container,
      });

      await new Promise((resolve) => setTimeout(resolve, 600));

      const link = wrapper.find("a");
      const linkText = link.text();

      // Should not have duplicate URLs
      const urlCount = (linkText.match(/https:\/\/example\.com/g) || []).length;
      expect(urlCount).toBe(1);

      wrapper.unmount();
    });
  });

  describe("processTableHeaders", () => {
    it("should add text to empty table headers", async () => {
      const TestComponent = defineComponent({
        setup() {
          const { processTableHeaders } = usePrintLinks();
          return { processTableHeaders };
        },
        template: `
          <div class="print-content">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Header 2</th>
                </tr>
              </thead>
            </table>
          </div>
        `,
      });

      const wrapper = mount(TestComponent, {
        attachTo: container,
      });

      await new Promise((resolve) => setTimeout(resolve, 600));

      const headers = wrapper.findAll("th");
      expect(headers.length).toBe(2);

      // First header should have default text
      expect(headers[0].text()).toBeTruthy();

      // Second header should remain unchanged
      expect(headers[1].text()).toBe("Header 2");

      wrapper.unmount();
    });

    it("should handle headers with only HTML comments", async () => {
      const TestComponent = defineComponent({
        setup() {
          const { processTableHeaders } = usePrintLinks();
          return { processTableHeaders };
        },
        template: `
          <div class="print-content">
            <table>
              <thead>
                <tr>
                  <th><!--[--><!--]--></th>
                  <th>Valid Header</th>
                </tr>
              </thead>
            </table>
          </div>
        `,
      });

      const wrapper = mount(TestComponent, {
        attachTo: container,
      });

      await new Promise((resolve) => setTimeout(resolve, 600));

      const headers = wrapper.findAll("th");

      // First header should have been cleaned and given default text
      const firstHeaderText = headers[0].text();
      expect(firstHeaderText).toBeTruthy();
      expect(firstHeaderText).not.toContain("<!--");

      wrapper.unmount();
    });

    it("should add aria-label to table headers", async () => {
      const TestComponent = defineComponent({
        setup() {
          const { processTableHeaders } = usePrintLinks();
          return { processTableHeaders };
        },
        template: `
          <div class="print-content">
            <table>
              <thead>
                <tr>
                  <th></th>
                </tr>
              </thead>
            </table>
          </div>
        `,
      });

      const wrapper = mount(TestComponent, {
        attachTo: container,
      });

      await new Promise((resolve) => setTimeout(resolve, 600));

      const header = wrapper.find("th");
      expect(header.attributes("aria-label")).toBeTruthy();

      wrapper.unmount();
    });
  });
});
