import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";

const ReportGenerator = () => {
  const generateReport = async (
    predictionData,
    probability,
    studentData,
    action,
    modelName,
    modelAccuracy
  ) => {
    try {
      // Get the report container element
      const reportContainer = document.getElementById("report-container");

      if (!reportContainer) {
        console.error("Report container not found");
        toast.error("Report container not found. Please try again.");
        return;
      }

      // Set fixed width for consistent desktop-like rendering
      const desktopWidth = 1024; // Standard desktop width
      const originalWidth = reportContainer.offsetWidth;
      const scale = desktopWidth / originalWidth;

      // Show loading toast
      const loadingToast = toast.loading("Generating report...");

      // Capture the report container as an image with fixed dimensions
      const canvas = await html2canvas(reportContainer, {
        scale: 2 * scale, // Higher scale for better quality, adjusted for desktop width
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true,
        removeContainer: true,
        width: desktopWidth, // Force desktop width
        windowWidth: desktopWidth, // Set window width for rendering
      });

      // Update loading toast
      toast.update(loadingToast, {
        render:
          action === "print" ? "Preparing print preview..." : "Creating PDF...",
        type: "info",
        isLoading: true,
      });

      if (action === "print") {
        // For printing, create a temporary iframe in the current page
        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "0";

        document.body.appendChild(iframe);

        // Create the document structure using DOM methods instead of document.write
        const iframeDoc = iframe.contentWindow.document;

        // Create HTML elements
        const htmlEl = iframeDoc.createElement("html");
        const headEl = iframeDoc.createElement("head");
        const bodyEl = iframeDoc.createElement("body");

        // Create and set title
        const titleEl = iframeDoc.createElement("title");
        titleEl.textContent = "Placement Prediction Report";
        headEl.appendChild(titleEl);

        // Create and set styles
        const styleEl = iframeDoc.createElement("style");
        styleEl.textContent = `
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
          }
          .report-container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
          }
          img {
            width: 100%;
            height: auto;
            display: block;
          }
          @media print {
            @page {
              size: auto;
              margin: 0mm;
            }
          }
        `;
        headEl.appendChild(styleEl);

        // Create container and image
        const containerEl = iframeDoc.createElement("div");
        containerEl.className = "report-container";

        const imgEl = iframeDoc.createElement("img");
        imgEl.src = canvas.toDataURL("image/png");
        imgEl.alt = "Placement Prediction Report";

        // Assemble the document
        containerEl.appendChild(imgEl);
        bodyEl.appendChild(containerEl);
        htmlEl.appendChild(headEl);
        htmlEl.appendChild(bodyEl);

        // Add the document structure to the iframe
        iframeDoc.open();
        iframeDoc.appendChild(htmlEl);
        iframeDoc.close();

        // Wait for iframe to load before printing
        setTimeout(() => {
          try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();

            // Remove iframe after printing (or after a timeout)
            setTimeout(() => {
              document.body.removeChild(iframe);

              // Update toast
              toast.update(loadingToast, {
                render: "Print preview ready!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
              });
            }, 1000);
          } catch (err) {
            console.error("Print error:", err);
            document.body.removeChild(iframe);

            // Update toast with error
            toast.update(loadingToast, {
              render: "Error printing report. Please try again.",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
          }
        }, 500);
      } else if (action === "download") {
        // For download, create a PDF with the image
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        // Add image to PDF
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          imgWidth,
          imgHeight
        );

        // If image is taller than a page, handle multiple pages
        if (imgHeight > pageHeight) {
          let remainingHeight = imgHeight;
          let position = 0;

          while (remainingHeight > 0) {
            position -= pageHeight;
            remainingHeight -= pageHeight;

            if (remainingHeight > 0) {
              pdf.addPage();
              pdf.addImage(
                canvas.toDataURL("image/png"),
                "PNG",
                0,
                position,
                imgWidth,
                imgHeight
              );
            }
          }
        }

        // Generate filename with current date and model info
        const modelInfo = modelName ? `_${modelName}` : "";
        const fileName = `placement_prediction${modelInfo}_${new Date()
          .toISOString()
          .slice(0, 10)}.pdf`;
        pdf.save(fileName);

        // Update toast
        toast.update(loadingToast, {
          render: "PDF downloaded successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error(
        "There was an error generating the report. Please try again."
      );
    }
  };

  return { generateReport };
};

export default ReportGenerator;
