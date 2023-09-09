sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("tabledata.pdfdownloadproject.controller.View1", {
            onInit: function () {

            },

            downloadpdf: function () {
                var rows = [];
                var oBinding = this.byId("table").getBinding("items");
                var jsonData = oBinding.getModel().getProperty(oBinding.getPath())
                // var jsonData = oBinding.oList;
                jsonData.forEach(function (item) {
                    var row = [];
                    Object.keys(item).forEach(function (key) {
                        row.push(item[key]);
                    });
                    rows.push(row);
                });
                var docDefinition = {
                    content: [
                        {
                            style: "header",
                            alignment: "center",
                            text: "Report"
                        }
                        , {
                            table: {
                                headerRows: 1,
                                widths: ["*", "*", "*", "*", "*"],
                                body: [
                                    ["Name", "Role", "Skills", "Phone", "Address"],
                                    ...rows
                                ]
                            }
                        }
                    ]
                };
                var pdfDocGenerator = pdfMake.createPdf(docDefinition);
                pdfDocGenerator.download("table.pdf");
            }
        });
    });
