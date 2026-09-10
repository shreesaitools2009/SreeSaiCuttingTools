document.addEventListener("DOMContentLoaded", function () {
  // ==========================================================
  // HELPERS
  // ==========================================================
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      }[char];
    });
  }

  function safeUrl(value) {
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
    } catch (e) {
      return "#";
    }
  }

  // ==========================================================
  // MOBILE MENU
  // ==========================================================
  const menuBtn = document.querySelector(".menuBtn");
  const nav = document.querySelector("header nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  // ==========================================================
  // MANAGEMENT / LEADERSHIP CARDS
  // ==========================================================
  const teamList = document.getElementById("team-list");

  if (teamList && window.SSCT_DATA && Array.isArray(window.SSCT_DATA.management)) {
    teamList.innerHTML = window.SSCT_DATA.management.map(function (person) {
      const name = escapeHtml(person.name);
      const role = escapeHtml(person.role);
      const displayEmail = escapeHtml(person.displayEmail || person.emailTarget || "");
      const emailTarget = person.emailTarget || "";
      const emailSubject = encodeURIComponent(`Website Enquiry - ${person.role || ""} - Sree Sai Cutting Tools Pvt Ltd`);
      const emailLink = emailTarget ? `mailto:${emailTarget}?subject=${emailSubject}` : "#";
      const phoneLink = person.phone ? String(person.phone).replace(/[^\d+]/g, "") : "";

      let whatsappButton = "";
      if (person.whatsApp) {
        const whatsappNumber = String(person.whatsApp).replace(/[^\d]/g, "");
        const whatsappMessage = encodeURIComponent(`Hello ${person.name || ""}, I am contacting you through the Sree Sai Cutting Tools Pvt Ltd website regarding a tooling requirement.`);
        whatsappButton = `<a class="contactAction whatsappAction" href="https://wa.me/${whatsappNumber}?text=${whatsappMessage}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ${name}"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>`;
      }

      return `
        <article class="teamCard">
          <div class="teamIcon"><i class="fa-solid fa-user-tie"></i></div>
          <div class="teamContent">
            <h3>${name}</h3>
            <div class="teamRole">${role}</div>
            <div class="teamContact">
              ${displayEmail ? `<a href="${emailLink}" class="teamEmail"><i class="fa-regular fa-envelope"></i>${displayEmail}</a>` : ""}
              ${person.phone ? `<a href="tel:${phoneLink}" class="teamPhone"><i class="fa-solid fa-phone"></i>${escapeHtml(person.phone)}</a>` : ""}
            </div>
            <div class="teamActions">
              ${displayEmail ? `<a href="${emailLink}" class="contactAction emailAction"><i class="fa-regular fa-envelope"></i>Email</a>` : ""}
              ${whatsappButton}
            </div>
          </div>
        </article>`;
    }).join("");
  }

  // ==========================================================
  // CUSTOMER LIST - CLICKABLE WEBSITE LINKS
  // ==========================================================
  const customerList = document.getElementById("customer-list");

  if (customerList && window.SSCT_DATA && Array.isArray(window.SSCT_DATA.customers)) {
    customerList.innerHTML = window.SSCT_DATA.customers.map(function (customer) {
      if (typeof customer === "string") {
        return `<div class="customerItem">${escapeHtml(customer)}</div>`;
      }

      const name = escapeHtml(customer.name || "Customer");
      const website = customer.website ? safeUrl(customer.website) : "";

      if (website && website !== "#") {
        return `<a class="customerItem customerLink" href="${website}" target="_blank" rel="noopener noreferrer" title="Visit ${name} website"><span class="customerName">${name}</span><i class="fa-solid fa-arrow-up-right-from-square customerExternalIcon" aria-hidden="true"></i></a>`;
      }

      return `<div class="customerItem">${name}</div>`;
    }).join("");
  }

  // ==========================================================
  // INDUSTRY APPLICATION MODALS
  // ==========================================================
  const INDUSTRIES = {
    automotive: {
      kicker: "AUTOMOTIVE & DRIVELINE",
      title: "Cutting tools for spline, shaft, steering and drivetrain component production.",
      lead: "Automotive and driveline manufacturers often require repeatable tooth, spline and special-profile generation on shafts, yokes, transmission parts and related components. We can review the component geometry and develop a suitable custom cutting tool.",
      components: ["Axle shafts", "Spline shafts", "Propeller-shaft components", "Coupling / yoke components", "Steering-related components", "Transmission parts", "Powertrain components"],
      tools: [
        ["Spline Hobs", "For external spline generation where hobbing is the selected process."],
        ["Spline Milling Cutters", "Form tools manufactured around the specified spline geometry."],
        ["Gear Hobs", "For involute gear-tooth generation to module / DP and pressure-angle requirements."],
        ["Form Cutters", "For customer-defined profiles that require a dedicated form tool."],
        ["Special Cutters", "For non-standard component geometry and drawing-based requirements."],
        ["Coated Tooling", "Coating requirements can be reviewed as part of the complete tool specification."]
      ],
      inputs: ["Component or tool drawing", "Spline / gear standard", "Module or DP", "Pressure angle", "Number of teeth / splines", "Major / minor diameter", "Tool OD / length / bore", "Material grade", "Coating", "Quantity"],
      flow: "Typical path: component drawing → profile review → tool geometry → material / coating review → manufacture → inspection → delivery."
    },

    "starter-ring": {
      kicker: "STARTER RING GEARS",
      title: "Custom hobs for starter ring-gear tooth generation.",
      lead: "Starter ring gears require controlled external tooth geometry around the ring. Where hobbing is used to generate those teeth, a dedicated hob must match the required gear data, tool envelope and production process.",
      components: ["Starter ring gears", "Flywheel ring gears", "Flexplate ring gears", "Engine starter-system ring gears", "Passenger-vehicle applications", "Commercial-vehicle applications", "Tractor / off-highway applications"],
      tools: [
        ["Gear Hobs", "Custom hob geometry developed around the ring-gear tooth requirement."],
        ["Ground Hobs", "Ground-finish requirements can be reviewed when specified by the customer."],
        ["Single / Multi Start", "Start configuration can be considered against productivity and application needs."],
        ["Topping / Non-Topping", "The required tooth-form strategy is confirmed from the specification."],
        ["HSS / PM-HSS Grades", "Representative order history includes M2, M35 / EM35, M42, M50, ASP30 and ASP2030."],
        ["Coated Requirements", "Coated tool supply can be considered when included in the customer specification."]
      ],
      inputs: ["Ring-gear drawing", "Module or DP", "Pressure angle", "Number of teeth", "Helix / lead details if applicable", "Tool OD", "Tool length", "Bore", "Number of starts", "Topping / non-topping", "Material grade", "Coating", "Quantity"],
      flow: "Vehicle / engine → flywheel or flexplate assembly → starter ring gear → gear teeth generated by hobbing → custom hob matched to the ring-gear requirement."
    },

    "commercial-heavy": {
      kicker: "COMMERCIAL VEHICLES & HEAVY EQUIPMENT",
      title: "Tooling for heavy-duty drivetrain and power-transmission components.",
      lead: "Commercial vehicles, off-highway machines and construction equipment use shafts, couplings, gears and splined components designed for demanding torque and service conditions. Custom cutting tools can be built around the required profile and production method.",
      components: ["Heavy-duty axle / shaft components", "Transmission gearing", "Driveline couplings", "Splined power-transmission components", "Earth-moving equipment components", "Construction machinery components"],
      tools: [["Gear Hobs", "For external gear profiles."], ["Spline Hobs", "For splined shafts and related components."], ["Spline Milling Cutters", "For dedicated spline profiles."], ["Form Milling Cutters", "For drawing-defined forms."], ["Special Cutting Tools", "For non-standard heavy-equipment geometry."], ["Coated Tools", "For customer-specified coated requirements."]],
      inputs: ["Component drawing", "Module / DP / pitch", "Pressure angle", "Teeth / starts", "Profile standard", "Tool dimensions", "Material / grade", "Coating", "Quantity", "Production requirement"],
      flow: "Heavy-equipment component → identify gear / spline / special profile → select cutting process → engineer dedicated tool."
    },

    agriculture: {
      kicker: "AGRICULTURE & TRACTORS",
      title: "Cutting tools for tractor, starter, transmission and agricultural-machinery components.",
      lead: "Agricultural machinery combines starter systems, transmissions, shafts, sprockets and geared mechanisms. These applications can require both standard gear-cutting geometry and customer-specific special profiles.",
      components: ["Tractor starter ring gears", "Transmission gears", "Spline shafts", "Sprockets", "Agricultural implement drives", "Power-transmission components"],
      tools: [["Gear Hobs", "Gear tooth generation for transmission and drive components."], ["Spline Cutters", "Spline profiles on shafts and mating components."], ["Sprocket / Chain Hobs", "Pitch and roller-profile applications."], ["Form Cutters", "Dedicated agricultural component profiles."], ["Special Tools", "Drawing-based non-standard requirements."], ["Ground / Coated Hobs", "When specified for the intended production process."]],
      inputs: ["Drawing", "Pitch / module / DP", "Pressure angle", "Teeth", "Roller diameter where relevant", "Starts", "Tool OD / length / bore", "Material", "Coating", "Quantity"],
      flow: "Agricultural component → identify tooth / spline / chain profile → review process and production quantity → manufacture matching cutter."
    },

    mining: {
      kicker: "MINING, DRILLING & CONSTRUCTION",
      title: "Special-profile and spline tooling for demanding equipment-component manufacturing.",
      lead: "Rock-drilling, mining, tunnelling, quarrying and construction equipment contain numerous machined interfaces, splines, drive features and special forms. We can assess drawing-based cutting-tool requirements for such component manufacturing.",
      components: ["Rock-drilling equipment components", "DTH / hammer-related machined components", "Drive subs and coupling-type parts", "Mining machinery components", "Tunnelling equipment", "Quarry equipment", "Construction equipment"],
      tools: [["Spline Cutters", "For specified spline interfaces."], ["Form Milling Cutters", "For controlled, drawing-defined profiles."], ["Special Cutting Tools", "For application-specific machined forms."], ["Gear Hobs", "Where geared components are part of the equipment system."], ["Ratchet / Profile Cutters", "For dedicated tooth or indexing profiles."], ["Material / Coating Options", "Reviewed according to the tool drawing and cutting conditions."]],
      inputs: ["Component / tool drawing", "Profile dimensions", "Spline / gear details", "Pitch", "Pressure angle", "Tool envelope", "Material grade", "Coating", "Quantity", "Workpiece / application notes"],
      flow: "Mining or drilling component → drawing / profile review → select form, spline, gear or special cutter → confirm production specification."
    },

    industrial: {
      kicker: "INDUSTRIAL MACHINERY & POWER",
      title: "Custom tooling for industrial gears, racks, sprockets and drive components.",
      lead: "Industrial machinery and power-transmission systems use a broad mix of gears, racks, sprockets and splined or formed parts. Tooling can be developed from either the component drawing or an existing tool specification.",
      components: ["Industrial gears", "Gearbox components", "Rack profiles", "Sprockets", "Spline components", "Machine-drive components", "Power-generation equipment components"],
      tools: [["Gear Hobs", "For gear generation to customer geometry."], ["Rack Milling Cutters", "For rack-tooth and linear gear profiles."], ["Sprocket Hobs", "For sprocket and roller-chain related profiles."], ["Spline Cutters", "For splined drive components."], ["Form Milling Cutters", "For dedicated special forms."], ["Special Tools", "For drawing-based industrial requirements."]],
      inputs: ["Component / tool drawing", "Module / DP", "Pressure angle", "Pitch", "Teeth", "Starts", "OD / length / bore", "Material", "Coating", "Quantity"],
      flow: "Industrial component → define required tooth / rack / sprocket / spline profile → engineer matching cutter."
    },

    "gear-shops": {
      kicker: "GEAR & COMPONENT MANUFACTURERS",
      title: "A tooling partner for OEMs, Tier suppliers and gear job shops.",
      lead: "Gear and component manufacturers often need a mix of repeat tooling, replacement cutters and new drawing-based designs. We can support one-off development as well as recurring requirements across multiple tool families.",
      components: ["Custom gears", "Splined components", "Job-shop gear production", "Replacement-tool requirements", "New component launches", "Recurring production tooling"],
      tools: [["Gear Hobs", "Custom and repeat hob requirements."], ["Spline Hobs", "External spline generation."], ["Spline Milling Cutters", "Form-milled spline geometry."], ["Rack Milling Cutters", "Linear gear / rack profiles."], ["Form Milling Cutters", "Special-profile production."], ["Reverse Engineering Inputs", "Existing tool details can supplement the component drawing where appropriate."]],
      inputs: ["Component drawing", "Existing tool drawing", "Tool sample details", "Module / DP / pitch", "Pressure angle", "Tool size", "Material / grade", "Coating", "Quantity", "Target delivery"],
      flow: "New or repeat requirement → review component / previous tool → confirm technical data → quote → manufacture and inspect."
    },

    "chain-sprocket": {
      kicker: "CHAIN, SPROCKET & RATCHET COMPONENTS",
      title: "Pitch- and roller-profile tooling for chain, sprocket and ratchet applications.",
      lead: "Our supplied-tool history includes chain / roller-profile hob requirements, single- and multi-start configurations, non-topping requirements and ratchet cutters. This supports enquiries beyond conventional involute gear hobs.",
      components: ["Roller-chain sprockets", "Chain-drive components", "Ratchet components", "Indexed tooth profiles", "Special pitch-based profiles"],
      tools: [["Sprocket / Chain Hobs", "Developed around pitch and roller-diameter requirements."], ["Single-Start Hobs", "Available where the customer specification calls for single-start geometry."], ["Multi-Start Hobs", "Multi-start configurations can be reviewed when specified."], ["Non-Topping Hobs", "Non-topping requirements supported from drawing / specification."], ["Ratchet Cutters", "Dedicated form cutters for ratchet-tooth profiles."], ["Ground / Coated Tools", "Ground and coated requirements can be reviewed as part of the tool specification."]],
      inputs: ["Pitch", "Roller diameter", "Sprocket / tooth drawing", "Number of teeth", "Start configuration", "Topping / non-topping", "Tool OD / length / bore", "Material", "Coating", "Quantity"],
      flow: "Chain / ratchet component → pitch and profile data → start / topping requirement → dedicated hob or form cutter."
    }
  };

  const modal = document.getElementById("industry-modal");
  const modalContent = document.getElementById("industry-modal-content");
  let lastTrigger = null;

  function openIndustryModal(key, trigger) {
    if (!modal || !modalContent || !INDUSTRIES[key]) return;
    const item = INDUSTRIES[key];
    lastTrigger = trigger || null;

    const components = item.components.map(function (x) {
      return `<span class="modalPill">${escapeHtml(x)}</span>`;
    }).join("");

    const tools = item.tools.map(function (x) {
      return `<div class="modalTool"><b><i class="fa-solid fa-circle-check"></i>${escapeHtml(x[0])}</b><p>${escapeHtml(x[1])}</p></div>`;
    }).join("");

    const inputs = item.inputs.map(function (x) {
      return `<span class="modalPill">${escapeHtml(x)}</span>`;
    }).join("");

    const subject = encodeURIComponent(`${item.kicker} tooling requirement`);

    modalContent.innerHTML = `
      <div class="industryModalKicker">${escapeHtml(item.kicker)}</div>
      <h2 class="industryModalTitle" id="industry-modal-title">${escapeHtml(item.title)}</h2>
      <p class="industryModalLead">${escapeHtml(item.lead)}</p>

      <h3 class="modalSectionTitle">Typical component / application examples</h3>
      <div class="modalPillGrid">${components}</div>

      <h3 class="modalSectionTitle">Cutting tools that may apply</h3>
      <div class="modalToolGrid">${tools}</div>

      <div class="modalFlow"><strong>How the requirement connects to us</strong><span>${escapeHtml(item.flow)}</span></div>

      <h3 class="modalSectionTitle">Useful details for an RFQ</h3>
      <div class="modalPillGrid">${inputs}</div>

      <div class="modalRfqBox">
        <div><b>Have a similar component?</b><p>Send the drawing or technical requirement and ask us to review the appropriate cutting tool.</p></div>
        <a class="btn" href="quote.html?application=${encodeURIComponent(key)}&subject=${subject}"><i class="fa-solid fa-paper-plane"></i> Send Similar Requirement</a>
      </div>`;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modalOpen");
    const closeButton = modal.querySelector(".industryModalClose");
    if (closeButton) closeButton.focus();
  }

  function closeIndustryModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modalOpen");
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll("[data-industry]").forEach(function (button) {
    button.addEventListener("click", function () {
      openIndustryModal(button.getAttribute("data-industry"), button);
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach(function (button) {
    button.addEventListener("click", closeIndustryModal);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && modal.classList.contains("open")) {
      closeIndustryModal();
    }
  });

  // ==========================================================
  // OPTIONAL RFQ PRE-FILL FROM INDUSTRY PAGE
  // ==========================================================
  const params = new URLSearchParams(window.location.search);
  const application = params.get("application");
  const applicationField = document.querySelector('[name="application"], [name="details"], textarea[name="message"]');
  if (application && applicationField && INDUSTRIES[application]) {
    const prefix = `Application / Industry: ${INDUSTRIES[application].kicker}\n\n`;
    if (!applicationField.value.includes(prefix)) {
      applicationField.value = prefix + applicationField.value;
    }
  }

  // ==========================================================
  // VISIBILITY FALLBACK
  // ==========================================================
  document.querySelectorAll(".reveal").forEach(function (element) {
    element.classList.add("show");
  });
});
