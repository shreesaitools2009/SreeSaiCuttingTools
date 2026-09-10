SREE SAI CUTTING TOOLS - V5 PREMIUM WEBSITE

1) CUSTOMER NAMES + MANAGEMENT NAMES
--------------------------------------
Open: site-data.js

Edit the 'customers' array to add only customer names you are authorized to publish.
Edit the 'management' array to add CEO, Sales Manager, Operations Manager, etc.
The home/about/contact pages update automatically.

2) DRAWING / RFQ FORM -> EMAIL
------------------------------
GitHub Pages is a static website, so it cannot itself email attachments.
The included form is ready to connect to Formspree (or you can later replace it with another form backend).

Formspree setup:
- Create a Formspree account.
- Create a new form and set the destination email to shreesaitools@gmail.com (or your desired sales email).
- Formspree gives an endpoint like: https://formspree.io/f/abcdwxyz
- Open quote.html
- Replace: https://formspree.io/f/YOUR_FORMSPREE_FORM_ID
  with your real endpoint.
- Commit and push quote.html.
- Test with a non-confidential sample file.

IMPORTANT: File upload support/limits depend on the Formspree plan. Confirm the current plan before relying on large CAD files.

3) GITHUB / VSCODE
------------------
Copy these files into your repo root, then:
  git status
  git add .
  git commit -m "Upgrade website with premium UI and RFQ drawing upload"
  git push origin main

4) LOCAL TEST
-------------
Use VS Code Live Server OR run:
  python -m http.server 8000
Then open http://localhost:8000

5) PRIVACY
----------
Do not put customer drawings, purchase orders, invoices, prices, GST data or customer-specific technical data in the public GitHub repository.
Only upload public website files.


V7 UPDATE — MATERIAL / ORDER RANGE
- Expanded public material wording beyond M35/M50.
- Publicly shown grades: M2, M35/EM35, M42, M50, ASP30, ASP2030.
- Added coated-tool references: Alcrona and GC Altra, as supplied/specification examples.
- Added representative anonymized tooling configurations for spline cutters, chain/sprocket hobs, ground hobs, ratchet cutters and spline/gear hobs.
- Customer drawings, order numbers, customer-specific part numbers, prices and commercial information are intentionally NOT published.
- The uploaded drawing was used only as evidence that drawing-based custom geometry should be emphasized; it is not embedded in the site.
- Do not add ASP3 as a public grade until confirmed whether it means ASP3 or ASP30.

SREE SAI CUTTING TOOLS PVT LTD. - V8 INDUSTRIES / APPLICATIONS UPDATE

WHAT WAS ADDED
1. Rebuilt Industries page around downstream applications rather than generic industry labels.
2. Added 8 clickable application cards:
   - Automotive & Driveline
   - Starter Ring Gears
   - Commercial Vehicles & Heavy Equipment
   - Agriculture & Tractors
   - Mining, Drilling & Construction
   - Industrial Machinery & Power
   - Gear & Component Manufacturers
   - Chain, Sprocket & Ratchet Components
3. Added responsive click popups/modal windows containing:
   - typical component/application examples
   - relevant cutting-tool families
   - how the application connects to Sree Sai's tooling
   - information useful for an RFQ
   - Send Similar Requirement button
4. Added a visual Starter Ring Gear application flow:
   Vehicle/Engine -> Flywheel/Flexplate -> Starter Ring Gear -> Custom Hob
5. Added technical breadth section reflecting supplied/requested tool history:
   M2, M35/EM35, M42, M50, ASP30, ASP2030, ground hobs, coated requirements,
   single/multi-start and topping/non-topping configurations.
6. Preserved clickable customer links from site-data.js.
7. Added safer HTML rendering and URL validation in app.js for dynamic customer data.
8. Added mobile-responsive modal behavior and Escape-key close support.
9. Updated cache-busting query strings to v=8.

IMPORTANT CLAIM LANGUAGE
The website describes final components as APPLICATIONS that may use Sree Sai cutting tools.
It does NOT claim Sree Sai manufactures finished starter ring gears, propeller shafts, DTH hammers,
vehicles or other customer products.

PUBLIC-SITE CONFIDENTIALITY
Do not add customer PO numbers, prices, proprietary customer drawings, customer-specific part numbers,
GST details, supplier prices, or confidential commercial terms.

FILES TO COMMIT
Commit the complete contents of this folder to the GitHub Pages repository root.

