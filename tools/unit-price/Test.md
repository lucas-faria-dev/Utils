# Unit Price: manual test cases

Manual test script (decision D12). There is no automated test code.

**Before you start:** open the app from its HTTPS address (or from http://localhost while testing on a computer: serve the whole Utils folder, then open `/tools/unit-price/index.html`). Unless a case says otherwise, start each case by tapping **Clear all**. "Enter" a field means tap it and type the text exactly as shown between the quotes, without the quotes. Fill in Pass/Fail as you go.

Words used below:

- **Result**: the unit prices, the "Cheapest" or "Tie" badges, the summary line under Compare and the note under the summary.
- **Field message**: the red text under a price or quantity field.

## T-CALC: worked examples

Each example is run twice: once with Metric selected (ID ending in M) and once with Imperial selected (ID ending in I). The row's unit is the value chosen in that row's Unit selector.

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-CALC-01M | Tap Clear all. Select Metric. Enter Item 1: price "4.00", quantity "500", unit g; Item 2: price "3.00", quantity "300", unit g. Tap Compare. | Item 1: $0.80 per 100 g, badge "Cheapest". Item 2: $1.00 per 100 g. Summary: "Cheapest: Item 1 at $0.80 per 100 g.". No note. | |
| T-CALC-01I | Tap Clear all. Select Imperial. Enter Item 1: price "4.00", quantity "500", unit g; Item 2: price "3.00", quantity "300", unit g. Tap Compare. | Item 1: $0.23 per oz, badge "Cheapest". Item 2: $0.28 per oz. Summary: "Cheapest: Item 1 at $0.23 per oz.". No note. | |
| T-CALC-02M | Tap Clear all. Select Metric. Enter Item 1: price "2.49", quantity "750", unit ml; Item 2: price "1.99", quantity "500", unit ml. Tap Compare. | Item 1: $0.33 per 100 ml, badge "Cheapest". Item 2: $0.40 per 100 ml. Summary: "Cheapest: Item 1 at $0.33 per 100 ml.". No note. | |
| T-CALC-02I | Tap Clear all. Select Imperial. Enter Item 1: price "2.49", quantity "750", unit ml; Item 2: price "1.99", quantity "500", unit ml. Tap Compare. | Item 1: $0.10 per fl oz, badge "Cheapest". Item 2: $0.12 per fl oz. Summary: "Cheapest: Item 1 at $0.10 per fl oz.". No note. | |
| T-CALC-03M | Tap Clear all. Select Metric. Enter Item 1: price "3.99", quantity "12", unit pieces; Item 2: price "5.49", quantity "18", unit pieces. Tap Compare. | Item 1: $0.33 per piece. Item 2: $0.31 per piece, badge "Cheapest". Summary: "Cheapest: Item 2 at $0.31 per piece.". No note. | |
| T-CALC-03I | Tap Clear all. Select Imperial. Enter Item 1: price "3.99", quantity "12", unit pieces; Item 2: price "5.49", quantity "18", unit pieces. Tap Compare. | Item 1: $0.33 per piece. Item 2: $0.31 per piece, badge "Cheapest". Summary: "Cheapest: Item 2 at $0.31 per piece.". No note. | |
| T-CALC-04M | Tap Clear all. Select Metric. Enter Item 1: price "3.79", quantity "340", unit g; Item 2: price "3.99", quantity "12", unit oz. Tap Compare. | Item 1: $1.11 per 100 g, badge "Cheapest". Item 2: $1.17 per 100 g. Summary: "Cheapest: Item 1 at $1.11 per 100 g.". No note. | |
| T-CALC-04I | Tap Clear all. Select Imperial. Enter Item 1: price "3.79", quantity "340", unit g; Item 2: price "3.99", quantity "12", unit oz. Tap Compare. | Item 1: $0.32 per oz, badge "Cheapest". Item 2: $0.33 per oz. Summary: "Cheapest: Item 1 at $0.32 per oz.". No note. | |
| T-CALC-05M | Tap Clear all. Select Metric. Enter Item 1: price "1.29", quantity "500", unit ml; Item 2: price "1.29", quantity "16.9", unit fl oz. Tap Compare. | Item 1: $0.2580 per 100 ml, badge "Cheapest". Item 2: $0.2581 per 100 ml. Summary: "Cheapest: Item 1 at $0.2580 per 100 ml.". No note. | |
| T-CALC-05I | Tap Clear all. Select Imperial. Enter Item 1: price "1.29", quantity "500", unit ml; Item 2: price "1.29", quantity "16.9", unit fl oz. Tap Compare. | Item 1: $0.0763 per fl oz, badge "Cheapest". Item 2: $0.0763 per fl oz. Summary: "Cheapest: Item 1 at $0.0763 per fl oz.". No note. | |
| T-CALC-06M | Tap Clear all. Select Metric. Enter Item 1: price "2.00", quantity "200", unit g; Item 2: price "4.00", quantity "400", unit g. Tap Compare. | Item 1: $1.00 per 100 g, badge "Tie". Item 2: $1.00 per 100 g, badge "Tie". Summary: "Tie for cheapest: Item 1 and Item 2 at $1.00 per 100 g.". No note. | |
| T-CALC-06I | Tap Clear all. Select Imperial. Enter Item 1: price "2.00", quantity "200", unit g; Item 2: price "4.00", quantity "400", unit g. Tap Compare. | Item 1: $0.28 per oz, badge "Tie". Item 2: $0.28 per oz, badge "Tie". Summary: "Tie for cheapest: Item 1 and Item 2 at $0.28 per oz.". No note. | |
| T-CALC-07M | Tap Clear all. Select Metric. Enter Item 1: price "0.30", quantity "3", unit g; Item 2: price "0.10", quantity "1", unit g. Tap Compare. | Item 1: $10.00 per 100 g, badge "Tie". Item 2: $10.00 per 100 g, badge "Tie". Summary: "Tie for cheapest: Item 1 and Item 2 at $10.00 per 100 g.". No note. | |
| T-CALC-07I | Tap Clear all. Select Imperial. Enter Item 1: price "0.30", quantity "3", unit g; Item 2: price "0.10", quantity "1", unit g. Tap Compare. | Item 1: $2.83 per oz, badge "Tie". Item 2: $2.83 per oz, badge "Tie". Summary: "Tie for cheapest: Item 1 and Item 2 at $2.83 per oz.". No note. | |
| T-CALC-08M | Tap Clear all. Select Metric. Enter Item 1: price "2.01", quantity "200", unit g; Item 2: price "3.00", quantity "300", unit g. Tap Compare. | Item 1: $1.01 per 100 g. Item 2: $1.00 per 100 g, badge "Cheapest". Summary: "Cheapest: Item 2 at $1.00 per 100 g.". No note. | |
| T-CALC-08I | Tap Clear all. Select Imperial. Enter Item 1: price "2.01", quantity "200", unit g; Item 2: price "3.00", quantity "300", unit g. Tap Compare. | Item 1: $0.285 per oz. Item 2: $0.283 per oz, badge "Cheapest". Summary: "Cheapest: Item 2 at $0.283 per oz.". No note. | |
| T-CALC-09M | Tap Clear all. Select Metric. Enter Item 1: price "1.99", quantity "250", unit g; Item 2: price "3.18", quantity "400", unit g. Tap Compare. | Item 1: $0.796 per 100 g. Item 2: $0.795 per 100 g, badge "Cheapest". Summary: "Cheapest: Item 2 at $0.795 per 100 g.". No note. | |
| T-CALC-09I | Tap Clear all. Select Imperial. Enter Item 1: price "1.99", quantity "250", unit g; Item 2: price "3.18", quantity "400", unit g. Tap Compare. | Item 1: $0.226 per oz. Item 2: $0.225 per oz, badge "Cheapest". Summary: "Cheapest: Item 2 at $0.225 per oz.". No note. | |
| T-CALC-10M | Tap Clear all. Select Metric. Tap Add item once. Enter Item 1: price "4.00", quantity "500", unit g; Item 2: price (leave empty), quantity "300", unit g; Item 3: price "3.00", quantity "300", unit g. Tap Compare. | Item 1: $0.80 per 100 g, badge "Cheapest". Item 2: price message "Enter a price". Item 3: $1.00 per 100 g. Summary: "Cheapest: Item 1 at $0.80 per 100 g.". Note: "1 item left out. Check the highlighted fields.". | |
| T-CALC-10I | Tap Clear all. Select Imperial. Tap Add item once. Enter Item 1: price "4.00", quantity "500", unit g; Item 2: price (leave empty), quantity "300", unit g; Item 3: price "3.00", quantity "300", unit g. Tap Compare. | Item 1: $0.23 per oz, badge "Cheapest". Item 2: price message "Enter a price". Item 3: $0.28 per oz. Summary: "Cheapest: Item 1 at $0.23 per oz.". Note: "1 item left out. Check the highlighted fields.". | |
| T-CALC-11M | Tap Clear all. Select Metric. Enter Item 1: price "4.00", quantity "500", unit g; Item 2: price "2.49", quantity "750", unit ml. Tap Compare. | Item 1: no unit price, no message. Item 2: no unit price, no message. Summary: "Compare one kind at a time: weight (g, oz), volume (ml, fl oz) or pieces.". No note. | |
| T-CALC-11I | Tap Clear all. Select Imperial. Enter Item 1: price "4.00", quantity "500", unit g; Item 2: price "2.49", quantity "750", unit ml. Tap Compare. | Item 1: no unit price, no message. Item 2: no unit price, no message. Summary: "Compare one kind at a time: weight (g, oz), volume (ml, fl oz) or pieces.". No note. | |
| T-CALC-12M | Tap Clear all. Select Metric. Enter Item 1: price "4,99", quantity "500", unit g; Item 2: price "5,39", quantity "600", unit g. Tap Compare. | Item 1: $1.00 per 100 g. Item 2: $0.90 per 100 g, badge "Cheapest". Summary: "Cheapest: Item 2 at $0.90 per 100 g.". No note. | |
| T-CALC-12I | Tap Clear all. Select Imperial. Enter Item 1: price "4,99", quantity "500", unit g; Item 2: price "5,39", quantity "600", unit g. Tap Compare. | Item 1: $0.28 per oz. Item 2: $0.25 per oz, badge "Cheapest". Summary: "Cheapest: Item 2 at $0.25 per oz.". No note. | |
| T-CALC-13M | Tap Clear all. Select Metric. Enter Item 1: price "3.99", quantity "1.5", unit pieces; Item 2: price "5.49", quantity "18", unit pieces. Tap Compare. | Item 1: quantity message "Use a whole number of pieces". Item 2: $0.31 per piece. Summary: "Add another item to compare.". Note: "1 item left out. Check the highlighted fields.". | |
| T-CALC-13I | Tap Clear all. Select Imperial. Enter Item 1: price "3.99", quantity "1.5", unit pieces; Item 2: price "5.49", quantity "18", unit pieces. Tap Compare. | Item 1: quantity message "Use a whole number of pieces". Item 2: $0.31 per piece. Summary: "Add another item to compare.". Note: "1 item left out. Check the highlighted fields.". | |
| T-CALC-14M | Tap Clear all. Select Metric. Enter Item 1: price "4.00", quantity "500", unit g; Item 2: leave every field empty. Tap Compare. | Item 1: $0.80 per 100 g. Item 2: no unit price, no message. Summary: "Add another item to compare.". No note. | |
| T-CALC-14I | Tap Clear all. Select Imperial. Enter Item 1: price "4.00", quantity "500", unit g; Item 2: leave every field empty. Tap Compare. | Item 1: $0.23 per oz. Item 2: no unit price, no message. Summary: "Add another item to compare.". No note. | |
| T-CALC-15M | Tap Clear all. Select Metric. Tap Add item 2 times. Enter Item 1: price "abc", quantity "500", unit g; Item 2: price "0", quantity "300", unit g; Item 3: price "3.00", quantity "1.2.3", unit g; Item 4: price "-1", quantity "0", unit g. Tap Compare. | Item 1: price message "Use numbers only, like 4.99". Item 2: price message "Must be more than 0". Item 3: quantity message "Use numbers only, like 4.99". Item 4: price message "Use numbers only, like 4.99", quantity message "Must be more than 0". Summary: "Enter a price and quantity for at least two items.". No note. | |
| T-CALC-15I | Tap Clear all. Select Imperial. Tap Add item 2 times. Enter Item 1: price "abc", quantity "500", unit g; Item 2: price "0", quantity "300", unit g; Item 3: price "3.00", quantity "1.2.3", unit g; Item 4: price "-1", quantity "0", unit g. Tap Compare. | Item 1: price message "Use numbers only, like 4.99". Item 2: price message "Must be more than 0". Item 3: quantity message "Use numbers only, like 4.99". Item 4: price message "Use numbers only, like 4.99", quantity message "Must be more than 0". Summary: "Enter a price and quantity for at least two items.". No note. | |
| T-CALC-16M | Tap Clear all. Select Metric. Enter Item 1: name "Store brand", price "4.00", quantity "500", unit g; Item 2: name "Name brand", price "3.00", quantity "300", unit g. Tap Compare. | Item 1: $0.80 per 100 g, badge "Cheapest". Item 2: $1.00 per 100 g. Summary: "Cheapest: Store brand at $0.80 per 100 g.". No note. | |
| T-CALC-16I | Tap Clear all. Select Imperial. Enter Item 1: name "Store brand", price "4.00", quantity "500", unit g; Item 2: name "Name brand", price "3.00", quantity "300", unit g. Tap Compare. | Item 1: $0.23 per oz, badge "Cheapest". Item 2: $0.28 per oz. Summary: "Cheapest: Store brand at $0.23 per oz.". No note. | |
| T-CALC-17M | Tap Clear all. Select Metric. Tap Add item once. Enter Item 1: price "2.00", quantity "200", unit g; Item 2: price "4.00", quantity "400", unit g; Item 3: price "5.00", quantity "400", unit g. Tap Compare. | Item 1: $1.00 per 100 g, badge "Tie". Item 2: $1.00 per 100 g, badge "Tie". Item 3: $1.25 per 100 g. Summary: "Tie for cheapest: Item 1 and Item 2 at $1.00 per 100 g.". No note. | |
| T-CALC-17I | Tap Clear all. Select Imperial. Tap Add item once. Enter Item 1: price "2.00", quantity "200", unit g; Item 2: price "4.00", quantity "400", unit g; Item 3: price "5.00", quantity "400", unit g. Tap Compare. | Item 1: $0.28 per oz, badge "Tie". Item 2: $0.28 per oz, badge "Tie". Item 3: $0.35 per oz. Summary: "Tie for cheapest: Item 1 and Item 2 at $0.28 per oz.". No note. | |
| T-CALC-18M | Tap Clear all. Select Metric. Enter Item 1: price "3.99", quantity "12", unit oz; Item 2: price "4.49", quantity "14", unit oz. Tap Compare. | Item 1: $1.17 per 100 g. Item 2: $1.13 per 100 g, badge "Cheapest". Summary: "Cheapest: Item 2 at $1.13 per 100 g.". No note. | |
| T-CALC-18I | Tap Clear all. Select Imperial. Enter Item 1: price "3.99", quantity "12", unit oz; Item 2: price "4.49", quantity "14", unit oz. Tap Compare. | Item 1: $0.33 per oz. Item 2: $0.32 per oz, badge "Cheapest". Summary: "Cheapest: Item 2 at $0.32 per oz.". No note. | |
| T-CALC-19M | Tap Clear all. Select Metric. Enter Item 1: leave every field empty; Item 2: leave every field empty. Tap Compare. | Item 1: no unit price, no message. Item 2: no unit price, no message. Summary: "Enter a price and quantity for at least two items.". No note. | |
| T-CALC-19I | Tap Clear all. Select Imperial. Enter Item 1: leave every field empty; Item 2: leave every field empty. Tap Compare. | Item 1: no unit price, no message. Item 2: no unit price, no message. Summary: "Enter a price and quantity for at least two items.". No note. | |
| T-CALC-20M | Tap Clear all. Select Metric. Enter Item 1: price "4.", quantity "500", unit g; Item 2: price ".5", quantity "50", unit g. Tap Compare. | Item 1: $0.80 per 100 g, badge "Cheapest". Item 2: $1.00 per 100 g. Summary: "Cheapest: Item 1 at $0.80 per 100 g.". No note. | |
| T-CALC-20I | Tap Clear all. Select Imperial. Enter Item 1: price "4.", quantity "500", unit g; Item 2: price ".5", quantity "50", unit g. Tap Compare. | Item 1: $0.23 per oz, badge "Cheapest". Item 2: $0.28 per oz. Summary: "Cheapest: Item 1 at $0.23 per oz.". No note. | |

## T-INPUT: reading typed numbers

For each case, enter Item 2 as price "3.00", quantity "300", unit g, unless the case says otherwise.

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-INPUT-01 | Item 1: leave price empty, quantity "500", unit g. Tap Compare. | Item 1 price shows "Enter a price". Item 1 has no unit price. Summary: "Add another item to compare." Note: "1 item left out. Check the highlighted fields." | |
| T-INPUT-02 | Item 1: price "4.00", leave quantity empty, unit g. Tap Compare. | Item 1 quantity shows "Enter a quantity". Note: "1 item left out. Check the highlighted fields." | |
| T-INPUT-03 | Item 1: price "abc", quantity "500", unit g. Tap Compare. | Item 1 price shows "Use numbers only, like 4.99". | |
| T-INPUT-04 | Item 1: price "4.00", quantity "1.2.3", unit g. Tap Compare. Then repeat with quantity "1,2.3". | Both times Item 1 quantity shows "Use numbers only, like 4.99". | |
| T-INPUT-05 | Item 1: price "-1", quantity "500", unit g. Tap Compare. | Item 1 price shows "Use numbers only, like 4.99". | |
| T-INPUT-06 | Item 1: price "0", quantity "500", unit g. Tap Compare. Then change price to "4.00" and quantity to "0.00". Tap Compare. | First: price shows "Must be more than 0". Second: quantity shows "Must be more than 0". | |
| T-INPUT-07 | Item 1: price "4,99", quantity "500", unit g. Tap Compare (Metric). | The comma is read as a decimal point (4.99). The two prices would both look like $1.00 with 2 decimals, so 3 are used: Item 1 "$0.998 per 100 g" with badge "Cheapest", Item 2 "$1.000 per 100 g". Summary: "Cheapest: Item 1 at $0.998 per 100 g." | |
| T-INPUT-08 | Item 1: price "4.", quantity "500", unit g. Item 2: price ".5", quantity "50", unit g. Tap Compare (Metric). | Both accepted. Item 1 "$0.80 per 100 g" with "Cheapest", Item 2 "$1.00 per 100 g". | |
| T-INPUT-09 | Item 1: price " 4.00 " (a space before and after), quantity "500", unit g. Tap Compare (Metric). | Accepted. Item 1 "$0.80 per 100 g" with "Cheapest". | |
| T-INPUT-10 | Item 1: price "4 00" (a space inside), quantity "500", unit g. Tap Compare. | Item 1 price shows "Use numbers only, like 4.99". | |
| T-INPUT-11 | Item 1: price "$4.00", quantity "1,000", unit g. Tap Compare. | Price shows "Use numbers only, like 4.99". Quantity "1,000" is read as 1.000 (comma is a decimal mark), so it is accepted. | |
| T-INPUT-12 | Tap the Item 1 price field and try to type "1234567890" (10 characters). Do the same in the quantity field. | Only 9 characters can be typed in each: "123456789". | |
| T-INPUT-13 | Item 1: price "3.99", quantity "1.5", unit pieces. Item 2: price "5.49", quantity "18", unit pieces. Tap Compare. | Item 1 quantity shows "Use a whole number of pieces". Item 2 shows "$0.31 per piece". Summary: "Add another item to compare." | |
| T-INPUT-14 | Item 1: price "3.99", quantity "12.0", unit pieces. Item 2: price "5.49", quantity "18", unit pieces. Tap Compare. | "12.0" is a whole number and is accepted. Item 2 "$0.31 per piece" with "Cheapest". | |
| T-INPUT-15 | Item 1: price "abc", quantity "0". Tap Compare. | Price shows only "Use numbers only, like 4.99"; quantity shows only "Must be more than 0". One message per field. | |
| T-INPUT-16 | With the messages of T-INPUT-15 on screen, type one character in the Item 1 price field. | The price message disappears and the price field loses its red border. The quantity message stays. | |

## T-ROWS: the item list

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-ROWS-01 | Item 1: price "4.00", quantity "500", unit g. Leave Item 2 untouched. Tap Compare (Metric). | Item 2 shows no message. Item 1 "$0.80 per 100 g". Summary: "Add another item to compare." No note. | |
| T-ROWS-02 | Item 1: name "Milk", nothing else. Leave Item 2 untouched. Tap Compare. | Item 1 shows "Enter a price" and "Enter a quantity". Summary: "Enter a price and quantity for at least two items." | |
| T-ROWS-03 | Set Item 2 unit to ml. Tap Add item. | A third empty row appears at the bottom with placeholder "Item 3" and unit ml. | |
| T-ROWS-04 | Tap Add item 10 times. Scroll down. | 12 rows, numbered Item 1 to Item 12 in the name placeholders. No limit is reached. | |
| T-ROWS-05 | Tap Add item once. Enter names "A", "B", "C" in the three rows. Tap Remove on row B. | Row B disappears. Rows A and C remain; the placeholder of the second row reads "Item 2". | |
| T-ROWS-06 | With two rows, enter name "A", price "1", quantity "2", unit oz in Item 1. Tap Remove on Item 1. | Item 1 stays on screen with empty name, price and quantity; its unit stays oz. Two rows remain. | |
| T-ROWS-07 | Add rows, enter values, tap Compare so a result and messages show. Tap Clear all. | Two empty rows. No unit price, badge, summary, note or field message. No confirmation is asked. | |
| T-ROWS-08 | Select Imperial. Tap Clear all. Then select Metric and tap Clear all. | First: both rows set to oz and Imperial still selected. Second: both rows set to g. | |
| T-ROWS-09 | Try to type 31 characters in a name field. | Only 30 characters are accepted. | |

## T-COMPARE: when results show and disappear

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-COMPARE-01 | Enter C1 (4.00 / 500 g and 3.00 / 300 g). Do not tap Compare. | No unit price, badge or summary is shown while typing. | |
| T-COMPARE-02 | Enter C1, tap Compare. Change Item 1's name. | Every unit price, badge, summary and note disappears. | |
| T-COMPARE-03 | Enter C1, tap Compare. Change Item 2's price. | The result disappears. | |
| T-COMPARE-04 | Enter C1, tap Compare. Change Item 2's quantity. | The result disappears. | |
| T-COMPARE-05 | Enter C1, tap Compare. Change Item 2's unit to oz. | The result disappears. | |
| T-COMPARE-06 | Enter C1, tap Compare. Tap Add item. | The result disappears; a third row is added. | |
| T-COMPARE-07 | Add a third row, enter C17, tap Compare. Tap Remove on Item 3. | The result disappears; Item 3 is removed. | |
| T-COMPARE-08 | Enter only Item 1: 4.00 / 500 g. Tap Compare. | Item 1 shows its unit price with no badge. Summary: "Add another item to compare." | |
| T-COMPARE-09 | Leave both rows empty. Tap Compare. | Summary: "Enter a price and quantity for at least two items." No field message. | |
| T-COMPARE-10 | Item 1: 4.00 / 500 g. Item 2: 2.49 / 750 ml. Tap Compare. | No unit price or badge. Summary: "Compare one kind at a time: weight (g, oz), volume (ml, fl oz) or pieces." | |
| T-COMPARE-11 | Item 1: 4.00 / 500 g. Item 2: 3.99 / 12 pieces. Tap Compare. | Same as T-COMPARE-10 (weight and pieces). | |
| T-COMPARE-12 | Item 1: 2.49 / 750 ml. Item 2: 3.99 / 12 pieces. Tap Compare. | Same as T-COMPARE-10 (volume and pieces). | |
| T-COMPARE-13 | Item 1: 4.00 / 16 oz. Item 2: 2.49 / 25 fl oz. Tap Compare. | Same as T-COMPARE-10 (oz is weight, fl oz is volume). | |
| T-COMPARE-14 | Item 1: 4.00 / 500 g. Item 2: empty price, quantity 300 g. Item 3: 3.00 / 300 g. Tap Compare. | Note: "1 item left out. Check the highlighted fields." | |
| T-COMPARE-15 | Tap Add item twice (4 rows). Item 1: 4.00 / 500 g. Item 2: "abc" / 300 g. Item 3: 3.00 / 300 g. Item 4: name "X" only. Tap Compare. | Items 1 and 3 compared. Note: "2 items left out. Check the highlighted fields." | |
| T-COMPARE-16 | Enter C1, tap Compare while the summary is off screen (for example after adding 6 rows). | The page scrolls so the summary is visible. | |
| T-COMPARE-17 | Item 1: 4.00 / 500 g. Item 2: "abc" / 750 ml. Item 3: 2.49 / 750 ml. Tap Compare. | Item 2 shows its message. Items 1 and 3 are different kinds: the mixed-kinds summary shows, no unit price, no note. | |

## T-SYSTEM: Metric or Imperial

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-SYSTEM-01 | Select Metric. Enter C4 (3.79 / 340 g and 3.99 / 12 oz). Tap Compare. Select Imperial. Select Metric again. | Metric: "$1.11 per 100 g" (Cheapest) and "$1.17 per 100 g". Imperial, shown at once without tapping Compare: "$0.32 per oz" (Cheapest) and "$0.33 per oz". Back in Metric: the first result again. Item 1 is the cheapest every time. | |
| T-SYSTEM-02 | Enter C5 (1.29 / 500 ml and 1.29 / 16.9 fl oz). Tap Compare in Metric, then switch to Imperial. | Metric: "$0.2580" and "$0.2581 per 100 ml". Imperial: "$0.0763" and "$0.0763 per fl oz". Only Item 1 has the "Cheapest" badge in both. | |
| T-SYSTEM-03 | Select Imperial. Close the browser tab or app fully, then open the app again. | Imperial is still selected. | |
| T-SYSTEM-04 | Enter C3 (pieces). Tap Compare. Switch system both ways. | Rows read "$0.33 per piece" and "$0.31 per piece" in both systems. | |
| T-SYSTEM-05 | Enter C4 (units g and oz). Tap Compare. Switch system both ways. | The Unit selectors still read g and oz. | |
| T-SYSTEM-06 | First visit (see T-MEMORY-03 to reset). | "Show results in" offers Metric and Imperial, Metric selected. | |

## T-DECIMALS

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-DECIMALS-01 | Enter C1 in Metric. Tap Compare. | 2 decimals: "$0.80" and "$1.00 per 100 g". | |
| T-DECIMALS-02 | Enter C9 (1.99 / 250 g and 3.18 / 400 g) in Metric. Tap Compare. | 3 decimals on every row: "$0.796" and "$0.795 per 100 g". Item 2 is the cheapest. | |
| T-DECIMALS-03 | Enter C5 in Metric. Tap Compare. | 4 decimals: "$0.2580" and "$0.2581 per 100 ml". | |
| T-DECIMALS-04 | Enter C5. Tap Compare. Switch to Imperial. | Both rows read "$0.0763 per fl oz" (4 decimals is the maximum). Only Item 1 has the badge. | |
| T-DECIMALS-05 | Enter C8 (2.01 / 200 g and 3.00 / 300 g). Tap Compare in Metric, then Imperial. | Metric uses 2 decimals ("$1.01", "$1.00"). Imperial uses 3 ("$0.285", "$0.283"): decimals are chosen again on switch. | |

## T-NAMES

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-NAMES-01 | Enter C16 (names "Store brand" and "Name brand"). Tap Compare (Metric). | Summary: "Cheapest: Store brand at $0.80 per 100 g." | |
| T-NAMES-02 | Enter C1 with no names. Tap Compare. | Summary uses "Item 1". | |
| T-NAMES-03 | Type 31 characters in a name field. | Only 30 are kept. | |
| T-NAMES-04 | Item 1: name "A", 2.00 / 200 g. Item 2: name "B", 4.00 / 400 g. Tap Compare (Metric). | Both rows show "Tie". Summary: "Tie for cheapest: A and B at $1.00 per 100 g." | |
| T-NAMES-05 | Tap Add item. Item 1: name "A", 1 / 100 g. Item 2: name "B", 2 / 200 g. Item 3: name "C", 3 / 300 g. Tap Compare (Metric). | All three show "Tie". Summary: "Tie for cheapest: A, B and C at $1.00 per 100 g." | |
| T-NAMES-06 | Tap Add item. Item 1: name "A", 2 / 200 g. Item 2: no name, 4 / 400 g. Item 3: name "C", 5 / 400 g. Tap Compare. | Summary: "Tie for cheapest: A and Item 2 at $1.00 per 100 g." | |
| T-NAMES-07 | Tap Add item twice (4 rows, no names). Item 2: name "X". Item 3: 4.00 / 500 g. Item 4: 3.00 / 300 g. Tap Remove on Item 2. Tap Compare (Metric). | After Remove the placeholders read "Item 1", "Item 2", "Item 3". Summary: "Cheapest: Item 2 at $0.80 per 100 g." (the row's new position). | |

## T-MEMORY

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-MEMORY-01 | Enter three rows with names, prices (one with a comma, like "4,99"), quantities and different units. Reload the page. | The same rows come back with exactly the same text and units. | |
| T-MEMORY-02 | Enter C1. Tap Compare. Reload. | The rows come back, but no unit price, badge, summary, note or field message is shown. | |
| T-MEMORY-03 | Open the app in a private (incognito) window. Enter C1 and tap Compare. Close the window and open a new private window. | The app works fully, shows no error, and starts again with two empty rows (nothing was remembered). | |
| T-MEMORY-04 | Enter some rows. Tap Clear all. Reload. | Two empty rows. | |
| T-MEMORY-05 | On a computer: open developer tools, set the localStorage key "unit-price:v1" to "{broken". Reload. | The app opens in the first-visit state: Metric, two empty rows set to g. | |

## T-OFFLINE

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-OFFLINE-01 | Open the app once with a connection. Wait for "Ready to use offline" at the bottom. Turn on airplane mode. Reload. | The app opens and looks the same. | |
| T-OFFLINE-02 | Continue from T-OFFLINE-01, still offline. Enter C1, tap Compare, switch system, Add item, Remove, Clear all. | Everything works. | |
| T-OFFLINE-03 | Open the app with a connection on a fresh browser profile. | "Ready to use offline" appears at the bottom after a moment. Before the offline copy is saved, the line is not shown. | |
| T-OFFLINE-04 | Publish the folder in a sub-folder of a site (for example https://example.com/Utils/tools/unit-price/index.html). Repeat T-OFFLINE-01 and 02 from that address. | Same results. | |
| T-OFFLINE-05 | With the app installed and offline-ready, change any file, change the cache name in sw.js to "unit-price-v2" and publish. Open the app with a connection and reload once more. | The new version is shown. In developer tools only the cache "unit-price-v2" exists. Offline still works. | |
| T-OFFLINE-06 | On a computer, open developer tools, Network tab. Use the app. | Every request goes to the app's own address. No other address is contacted. | |

## T-HOME: home screen

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-HOME-01 | iPhone, Safari: open the app, tap Share, then "Add to Home Screen". | The suggested name is "Unit Price". A green icon with a white dollar sign is added. | |
| T-HOME-02 | Android, Chrome: open the app, open the menu, tap "Add to home screen" or "Install app". | An icon named "Unit Price" is added. | |
| T-HOME-03 | Open the app from the icon. | It opens full screen, with no browser address bar. The content clears the notch and the home indicator. | |
| T-HOME-04 | Open from the icon once with a connection and wait for "Ready to use offline". Close it. Turn on airplane mode. Open from the icon again. | The app opens and compares. | |

## T-MOBILE

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-MOBILE-01 | On a computer, open developer tools, device mode, width 320 px. Add 5 rows and tap Compare with C10 values. | No horizontal scrolling. No text or control is cut off. | |
| T-MOBILE-02 | On a phone, tap a price field, then a quantity field. | A numeric keypad with a decimal key opens. | |
| T-MOBILE-03 | On a phone, turn to landscape. | The layout fits the width, no horizontal scrolling. | |
| T-MOBILE-04 | On a computer, set the window to 600 px wide or more. | The content sits in a centred column no wider than 480 px. | |
| T-MOBILE-05 | In developer tools, measure the buttons, inputs, selects and the Metric/Imperial options. | Each is at least 44 px high; each button at least 44 px wide. Text in inputs and selects is at least 16 px, so the phone does not zoom in when a field is tapped. | |

## T-A11Y: accessibility

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-A11Y-01 | Turn on VoiceOver (iPhone) or TalkBack (Android). Move through the page. | Each field is read with its row, for example "Price ($), Item 2"; the Remove button as "Remove Item 2" (or "Remove" and the item's name). The system control is read as "Show results in", Metric, Imperial. | |
| T-A11Y-02 | With the screen reader on, enter C10 and tap Compare. | The summary and note are read out without moving focus. The Item 2 price field is read as invalid, with "Enter a price". | |
| T-A11Y-03 | On a computer, use only the keyboard (Tab, Shift+Tab, Space, Enter, arrow keys). Switch system, enter C1, add a row, remove it, tap Compare, Clear all. | Everything can be reached and used. The focused control always has a visible outline. | |
| T-A11Y-04 | Look at a result in greyscale (or ask someone to read it without colour). | The cheapest row is identified by the word "Cheapest" or "Tie", not only by its highlighted background. | |

## T-TOOLBOX: inside the Utils toolbox

| ID | Steps | Expected result | Pass/Fail |
|---|---|---|---|
| T-TOOLBOX-01 | Open the Utils welcome page. Tap "Open Unit Price". | The Unit Price page opens in the toolbox's dark theme. | |
| T-TOOLBOX-02 | On the Unit Price page, tap "Back to toolbox". | The welcome page opens. The link sits above the heading and never covers a card while scrolling. | |
| T-TOOLBOX-03 | Open `tools/unit-price/index.html` straight from disk (a `file://` address). Enter C1 and tap Compare. | The app works and compares. "Ready to use offline" is not shown (offline needs HTTPS or localhost). | |
| T-TOOLBOX-04 | Served over http://localhost, wait for "Ready to use offline", go offline, reload. | The page still has the toolbox styling (base.css came from the offline copy). | |
| T-TOOLBOX-05 | In developer tools, run `caches.open('other-tool-v1')` in the console. Change the cache name in sw.js to "unit-price-v2" and reload twice. | "other-tool-v1" still exists; only "unit-price-v1" is gone. | |

## Test status

These cases were run against the original stand-alone Unit Price build. Moving it into the Utils toolbox changed the styling, the script loading and the service worker's file list, so every case needs re-running on this version.
