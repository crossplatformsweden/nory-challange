t.tsx
● IngredientCostsListPage › renders the page

    TypeError: Cannot destructure property 'locationId' of

'(0 , \_navigation.useParams)(...)' as it is undefined.

      63 |
      64 | const IngredientCostsListPage: FC<IngredientCost

sListPageProps> = () => { > 65 | const { locationId } = useParams();
| ^
66 | const router = useRouter();
67 | const searchParams = useSearchParams();
68 |

      at locationId (app/locations/[locationId]/ingredient-

costs/page.tsx:65:11)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at Object.<anonymous> (app/locations/[locationId]/ing
redient-costs/page.test.tsx:83:11)

● IngredientCostsListPage › renders the page container, t
itle, and navigation elements

    TypeError: (0 , _navigation.useSearchParams) is not a f

unction

      65 |   const { locationId } = useParams();
      66 |   const router = useRouter();
    > 67 |   const searchParams = useSearchParams();
         |                                       ^
      68 |
      69 |   const { data, isLoading, error } = useListLoca

tionIngredientCosts(
70 | locationId as string

      at IngredientCostsListPage (app/locations/[locationId

]/ingredient-costs/page.tsx:67:39)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/ingred
ient-costs/page.test.tsx:75:11)
at Object.renderComponent (app/locations/[locationId]
/ingredient-costs/page.test.tsx:90:5)

● IngredientCostsListPage › renders the table when data i
s loaded

    TypeError: (0 , _navigation.useSearchParams) is not a f

unction

      65 |   const { locationId } = useParams();
      66 |   const router = useRouter();
    > 67 |   const searchParams = useSearchParams();
         |                                       ^
      68 |
      69 |   const { data, isLoading, error } = useListLoca

tionIngredientCosts(
70 | locationId as string

      at IngredientCostsListPage (app/locations/[locationId

]/ingredient-costs/page.tsx:67:39)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/ingred
ient-costs/page.test.tsx:75:11)
at Object.renderComponent (app/locations/[locationId]
/ingredient-costs/page.test.tsx:107:5)

● IngredientCostsListPage › renders loading state correct
ly

    TypeError: (0 , _navigation.useSearchParams) is not a f

unction

      65 |   const { locationId } = useParams();
      66 |   const router = useRouter();
    > 67 |   const searchParams = useSearchParams();
         |                                       ^
      68 |
      69 |   const { data, isLoading, error } = useListLoca

tionIngredientCosts(
70 | locationId as string

      at IngredientCostsListPage (app/locations/[locationId

]/ingredient-costs/page.tsx:67:39)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/ingred
ient-costs/page.test.tsx:75:11)
at Object.renderComponent (app/locations/[locationId]
/ingredient-costs/page.test.tsx:133:5)

● IngredientCostsListPage › renders error state correctly

    TypeError: (0 , _navigation.useSearchParams) is not a f

unction

      65 |   const { locationId } = useParams();
      66 |   const router = useRouter();
    > 67 |   const searchParams = useSearchParams();
         |                                       ^
      68 |
      69 |   const { data, isLoading, error } = useListLoca

tionIngredientCosts(
70 | locationId as string

      at IngredientCostsListPage (app/locations/[locationId

]/ingredient-costs/page.tsx:67:39)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/ingred
ient-costs/page.test.tsx:75:11)
at Object.renderComponent (app/locations/[locationId]
/ingredient-costs/page.test.tsx:144:5)

● IngredientCostsListPage › renders empty state when no c
osts exist

    TypeError: (0 , _navigation.useSearchParams) is not a f

unction

      65 |   const { locationId } = useParams();
      66 |   const router = useRouter();
    > 67 |   const searchParams = useSearchParams();
         |                                       ^
      68 |
      69 |   const { data, isLoading, error } = useListLoca

tionIngredientCosts(
70 | locationId as string

      at IngredientCostsListPage (app/locations/[locationId

]/ingredient-costs/page.tsx:67:39)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/ingred
ient-costs/page.test.tsx:75:11)
at Object.renderComponent (app/locations/[locationId]
/ingredient-costs/page.test.tsx:155:5)

● IngredientCostsListPage › navigates back when back butt
on is clicked

    TypeError: (0 , _navigation.useSearchParams) is not a f

unction

      65 |   const { locationId } = useParams();
      66 |   const router = useRouter();
    > 67 |   const searchParams = useSearchParams();
         |                                       ^
      68 |
      69 |   const { data, isLoading, error } = useListLoca

tionIngredientCosts(
70 | locationId as string

      at IngredientCostsListPage (app/locations/[locationId

]/ingredient-costs/page.tsx:67:39)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/ingred
ient-costs/page.test.tsx:75:11)
at Object.renderComponent (app/locations/[locationId]
/ingredient-costs/page.test.tsx:172:5)

● IngredientCostsListPage › navigates to create page when
create button is clicked

    TypeError: (0 , _navigation.useSearchParams) is not a f

unction

      65 |   const { locationId } = useParams();
      66 |   const router = useRouter();
    > 67 |   const searchParams = useSearchParams();
         |                                       ^
      68 |
      69 |   const { data, isLoading, error } = useListLoca

tionIngredientCosts(
70 | locationId as string

      at IngredientCostsListPage (app/locations/[locationId

]/ingredient-costs/page.tsx:67:39)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/ingred
ient-costs/page.test.tsx:75:11)
at Object.renderComponent (app/locations/[locationId]
/ingredient-costs/page.test.tsx:185:5)

● IngredientCostsListPage › navigates to detail page when
view button is clicked

    TypeError: (0 , _navigation.useSearchParams) is not a f

unction

      65 |   const { locationId } = useParams();
      66 |   const router = useRouter();
    > 67 |   const searchParams = useSearchParams();
         |                                       ^
      68 |
      69 |   const { data, isLoading, error } = useListLoca

tionIngredientCosts(
70 | locationId as string

      at IngredientCostsListPage (app/locations/[locationId

]/ingredient-costs/page.tsx:67:39)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/ingred
ient-costs/page.test.tsx:75:11)
at Object.renderComponent (app/locations/[locationId]
/ingredient-costs/page.test.tsx:200:5)

FAIL app/locations/[locationId]/staff/page.test.tsx
● StaffListPage › renders staff cards when data is availa
ble

    TestingLibraryElementError: Unable to find an element b

y: [data-testid="staff-email-1"]

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="container mx-auto px-4 py-8"
          data-testid="staff-list-page"
        >
          <div
            class="mb-6 flex items-center justify-between"
          >
            <h1
              class="text-3xl font-bold"
              data-testid="staff-list-title"
            >
              Staff Members
            </h1>
            <a
              class="btn btn-primary"
              data-testid="staff-list-create-button"
              href="/locations/123/staff/create"
            >
              Add Staff Member
            </a>
          </div>
          <div
            class="grid grid-cols-1 gap-6 md:grid-cols-2 lg

:grid-cols-3"
data-testid="staff-list-content" >

<div
              class="card bg-base-100 shadow-xl"
              data-testid="staff-card-1"
            >
<div
                class="card-body"
              >
<h2
                  class="card-title"
                  data-testid="staff-name-1"
                >
John Doe
</h2>
<p
                  data-testid="staff-role-1"
                >
Manager
</p>
<p
                  data-testid="staff-dob-1"
                >
No date of birth provided
</p>
<div
                  class="card-actions mt-4 justify-end"
                >
<a
                    class="btn btn-primary btn-sm"
                    data-testid="staff-view-1"
                    href="/locations/123/staff/1"
                  >
View Details
</a>
</div>
</div>
</div>
<div
              class="card bg-base-100 shadow-xl"
              data-testid="staff-card-2"
            >
<div
                class="card-body"
              >
<h2
                  class="card-title"
                  data-testid="staff-name-2"
                >
Jane Smith
</h2>
<p
                  data-testid="staff-role-2"
                >
Staff
</p>
<p
                  data-testid="staff-dob-2"
                >
No date of birth provided
</p>
<div
                  class="card-actions mt-4 justify-end"
                >
<a
                    class="btn btn-primary btn-sm"
                    data-testid="staff-view-2"
                    href="/locations/123/staff/2"
                  >
View Details
</a>
</div>
</div>
</div>
</div>
</div>
</div>
</body>

      104 |     expect(screen.getByTestId('staff-card-2')).

toBeInTheDocument();
105 | expect(screen.getByTestId('staff-name-1')).
toBeInTheDocument(); > 106 | expect(screen.getByTestId('staff-email-1'))
.toBeInTheDocument();
| ^
107 | expect(screen.getByTestId('staff-role-1')).
toBeInTheDocument();
108 | expect(screen.getByTestId('staff-view-1')).
toBeInTheDocument();
109 | });

      at Object.getElementError (../../node_modules/.pnpm/@

testing-library+dom@9.3.4/node_modules/@testing-library/dom
/dist/config.js:37:19)
at ../../node_modules/.pnpm/@testing-library+dom@9.3.
4/node_modules/@testing-library/dom/dist/query-helpers.js:7
6:38
at ../../node_modules/.pnpm/@testing-library+dom@9.3.
4/node_modules/@testing-library/dom/dist/query-helpers.js:5
2:17
at ../../node_modules/.pnpm/@testing-library+dom@9.3.
4/node_modules/@testing-library/dom/dist/query-helpers.js:9
5:19
at Object.getByTestId (app/locations/[locationId]/sta
ff/page.test.tsx:106:19)

FAIL app/locations/[locationId]/reports/inventory-movemen
ts-timeline/page.test.tsx
● InventoryMovementsTimelinePage › renders the page

    TypeError: Cannot destructure property 'locationId' of

'(0 , \_navigation.useParams)(...)' as it is undefined.

      65 |   InventoryMovementsTimelinePageProps
      66 | > = () => {
    > 67 |   const { locationId } = useParams();
         |           ^
      68 |   const router = useRouter();
      69 |   const searchParams = useSearchParams();
      70 |   const [selectedIngredient, setSelectedIngredie

nt] = useState<string>(

      at locationId (app/locations/[locationId]/reports/inv

entory-movements-timeline/page.tsx:67:11)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at Object.<anonymous> (app/locations/[locationId]/rep
orts/inventory-movements-timeline/page.test.tsx:105:11)

● InventoryMovementsTimelinePage › renders the page conta
iner, title, and navigation elements

    TypeError: data?.data?.map is not a function

      196 |           >
      197 |             <option value="">All Ingredients</o

ption> > 198 | {data?.data?.map((movement) => (
| ^
199 | <option
200 | key={movement.ingredient.id}
201 | value={movement.ingredient.id}

      at map (app/locations/[locationId]/reports/inventory-

movements-timeline/page.tsx:198:26)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/report
s/inventory-movements-timeline/page.test.tsx:97:11)
at Object.renderComponent (app/locations/[locationId]
/reports/inventory-movements-timeline/page.test.tsx:112:5)

● InventoryMovementsTimelinePage › renders the filters wh
en data is loaded

    TypeError: data?.data?.map is not a function

      196 |           >
      197 |             <option value="">All Ingredients</o

ption> > 198 | {data?.data?.map((movement) => (
| ^
199 | <option
200 | key={movement.ingredient.id}
201 | value={movement.ingredient.id}

      at map (app/locations/[locationId]/reports/inventory-

movements-timeline/page.tsx:198:26)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/report
s/inventory-movements-timeline/page.test.tsx:97:11)
at Object.renderComponent (app/locations/[locationId]
/reports/inventory-movements-timeline/page.test.tsx:126:5)

● InventoryMovementsTimelinePage › renders the timeline t
able when data is loaded

    TypeError: data?.data?.map is not a function

      196 |           >
      197 |             <option value="">All Ingredients</o

ption> > 198 | {data?.data?.map((movement) => (
| ^
199 | <option
200 | key={movement.ingredient.id}
201 | value={movement.ingredient.id}

      at map (app/locations/[locationId]/reports/inventory-

movements-timeline/page.tsx:198:26)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/report
s/inventory-movements-timeline/page.test.tsx:97:11)
at Object.renderComponent (app/locations/[locationId]
/reports/inventory-movements-timeline/page.test.tsx:143:5)

● InventoryMovementsTimelinePage › renders empty state wh
en no movements exist

    TypeError: data?.data?.map is not a function

      196 |           >
      197 |             <option value="">All Ingredients</o

ption> > 198 | {data?.data?.map((movement) => (
| ^
199 | <option
200 | key={movement.ingredient.id}
201 | value={movement.ingredient.id}

      at map (app/locations/[locationId]/reports/inventory-

movements-timeline/page.tsx:198:26)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/report
s/inventory-movements-timeline/page.test.tsx:97:11)
at Object.renderComponent (app/locations/[locationId]
/reports/inventory-movements-timeline/page.test.tsx:197:5)

● InventoryMovementsTimelinePage › navigates back when ba
ck button is clicked

    TypeError: data?.data?.map is not a function

      196 |           >
      197 |             <option value="">All Ingredients</o

ption> > 198 | {data?.data?.map((movement) => (
| ^
199 | <option
200 | key={movement.ingredient.id}
201 | value={movement.ingredient.id}

      at map (app/locations/[locationId]/reports/inventory-

movements-timeline/page.tsx:198:26)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/report
s/inventory-movements-timeline/page.test.tsx:97:11)
at Object.renderComponent (app/locations/[locationId]
/reports/inventory-movements-timeline/page.test.tsx:213:5)

● InventoryMovementsTimelinePage › updates filters when s
elections change

    TypeError: data?.data?.map is not a function

      196 |           >
      197 |             <option value="">All Ingredients</o

ption> > 198 | {data?.data?.map((movement) => (
| ^
199 | <option
200 | key={movement.ingredient.id}
201 | value={movement.ingredient.id}

      at map (app/locations/[locationId]/reports/inventory-

movements-timeline/page.tsx:198:26)
at Object.react-stack-bottom-frame (../../node_module
s/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-do
m/cjs/react-dom-client.development.js:23863:20)
at renderWithHooks (../../node_modules/.pnpm/react-do
m@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-
client.development.js:5529:22)
at updateFunctionComponent (../../node_modules/.pnpm/
react-dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/re
act-dom-client.development.js:8897:19)
at beginWork (../../node_modules/.pnpm/react-dom@19.1
.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-client
.development.js:10522:18)
at runWithFiberInDEV (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:1522:13)
at performUnitOfWork (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:15140:22)
at workLoopSync (../../node_modules/.pnpm/react-dom@1
9.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-cli
ent.development.js:14956:41)
at renderRootSync (../../node_modules/.pnpm/react-dom
@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-dom-c
lient.development.js:14936:11)
at performWorkOnRoot (../../node_modules/.pnpm/react-
dom@19.1.0_react@19.1.0/node_modules/react-dom/cjs/react-do
m-client.development.js:14462:44)
at performWorkOnRootViaSchedulerTask (../../node_modu
les/.pnpm/react-dom@19.1.0_react@19.1.0/node_modules/react-
dom/cjs/react-dom-client.development.js:16216:7)
at flushActQueue (../../node_modules/.pnpm/react@19.1
.0/node_modules/react/cjs/react.development.js:566:34)
at Object.<anonymous>.process.env.NODE_ENV.exports.ac
t (../../node_modules/.pnpm/react@19.1.0/node_modules/react
/cjs/react.development.js:859:10)
at ../../node_modules/.pnpm/@testing-library+react@14
.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testing-libra
ry/react/dist/act-compat.js:47:25
at renderRoot (../../node_modules/.pnpm/@testing-libr
ary+react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@t
esting-library/react/dist/pure.js:180:26)
at render (../../node_modules/.pnpm/@testing-library+
react@14.3.1_2sdyanqo2b7vzitftgpe3cm4yy/node_modules/@testi
ng-library/react/dist/pure.js:271:10)
at renderComponent (app/locations/[locationId]/report
s/inventory-movements-timeline/page.test.tsx:97:11)
at Object.renderComponent (app/locations/[locationId]
/reports/inventory-movements-timeline/page.test.tsx:220:5)

FAIL app/locations/[locationId]/ingredient-costs/create/p
age.test.tsx
● CreateIngredientCostPage › submits form and navigates o
n success

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    Expected: {"data": {"cost": 10.99, "ingredientId": "ing

1"}, "locationId": "123"}, Any<Object>

    Number of calls: 0

    Ignored nodes: comments, script, style
    <html>
      <head />
      <body>
        <div>
          <div
            class="container mx-auto px-4 py-8"
            data-testid="ingredient-cost-create-page"
          >
            <div
              class="mb-6 flex items-center justify-between

" >

<div
                class="flex items-center"
              >
<button
                  class="btn btn-circle btn-ghost mr-4"
                  data-testid="ingredient-cost-create-back-
button"
                >
<svg
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
<path
                      d="M15 19l-7-7 7-7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
</svg>
</button>
<h1
                  class="text-3xl font-bold"
                  data-testid="ingredient-cost-create-title
"
                >
Create Ingredient Cost
</h1>
</div>
</div>
<div
              class="card bg-base-100 shadow-xl"
              data-testid="ingredient-cost-create-form"
            >
<div
                class="card-body"
              >
<form
                  class="space-y-6"
                >
<div
                    class="form-control w-full"
                  >
<label
                      class="label"
                      data-testid="ingredient-cost-create-i
ngredient-label"
                    >
<span
                        class="label-text"
                      >
Ingredient
</span>
</label>
<select
                      class="select select-bordered w-full"
                      data-testid="ingredient-cost-create-i
ngredient-select"
                      name="ingredientId"
                    >
<option
                        value=""
                      >
Select an ingredient
</option>
<option
                        value="ing1"
                      >
Flour
</option>
<option
                        value="ing2"
                      >
Sugar
</option>
</select>
</div>
<div
                    class="form-control w-full"
                  >
<label
                      class="label"
                      data-testid="ingredient-cost-create-c
ost-label"
                    >
<span
                        class="label-text"
                      >
Cost
</span>
</label>
<input
                      class="input input-bordered w-full"
                      data-testid="ingredient-cost-create-c
ost-input"
                      min="0"
                      name="cost"
                      step="0.01"
                      type="number"
                    />
</div>
<div
                    class="flex justify-end space-x-4"
                  >
<button
                      class="btn btn-ghost"
                      data-testid="ingredient-cost-create-c
ancel-button"
                      type="button"
                    >
Cancel
</button>
<button
                      class="btn btn-primary"
                      data-testid="ingredient-cost-create-s
ubmit-button"
                      type="submit"
                    >
Create Cost
</button>
</div>
</form>
</div>
</div>
</div>
</div>
</body>
</html>

      200 |
      201 |     await waitFor(() => {
    > 202 |       expect(mockMutate).toHaveBeenCalledWith(
          |                          ^
      203 |         {
      204 |           locationId: '123',
      205 |           data: {

      at toHaveBeenCalledWith (app/locations/[locationId]/i

ngredient-costs/create/page.test.tsx:202:26)
at runWithExpensiveErrorDiagnosticsDisabled (../../no
de_modules/.pnpm/@testing-library+dom@9.3.4/node_modules/@t
esting-library/dom/dist/config.js:47:12)
at checkCallback (../../node_modules/.pnpm/@testing-l
ibrary+dom@9.3.4/node_modules/@testing-library/dom/dist/wai
t-for.js:124:77)
at checkRealTimersCallback (../../node_modules/.pnpm/
@testing-library+dom@9.3.4/node_modules/@testing-library/do
m/dist/wait-for.js:118:16)
at Timeout.task [as _onTimeout] (../../node_modules/.
pnpm/jsdom@20.0.3/node_modules/jsdom/lib/jsdom/browser/Wind
ow.js:520:19)

FAIL app/locations/[locationId]/staff/create/page.test.ts
x
● CreateStaffPage › shows validation error for invalid em
ail

    Unable to find an element by: [data-testid="create-staf

f-email-error"]

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="container mx-auto px-4 py-8"
          data-testid="create-staff-page"
        >
          <div
            class="mb-6 flex items-center justify-between"
          >
            <h1
              class="text-3xl font-bold"
              data-testid="create-staff-title"
            >
              Create New Staff Member
            </h1>
            <button
              class="btn btn-ghost"
              data-testid="create-staff-cancel-button"
            >
              Cancel
            </button>
          </div>
          <div
            class="card bg-base-100 shadow-xl"
            data-testid="create-staff-content"
          >
            <div
              class="card-body"
            >
              <form
                class="space-y-6"
              >
                <div
                  class="form-control"
                >
                  <label
                    class="label"
                    for="name"
                  >
                    <span
                      class="label-text"
                    >
                      Full Name
                    </span>
                  </label>
                  <input
                    class="input input-bordered w-full "
                    data-testid="create-staff-name-input"
                    id="name"
                    name="name"
                    placeholder="Enter staff member's full

name"
type="text"
/>

</div>
<div
                  class="form-control"
                >
<label
                    class="label"
                    for="email"
                  >
<span
                      class="label-text"
                    >
Email
</span>
</label>
<input
                    class="input input-bordered w-full "
                    data-testid="create-staff-email-input"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    type="email"
                  />
</div>
<div
                  class="form-control"
                >
<label
                    class="label"
                    for="role"
                  >
<span
                      class="label-text"
                    >
Role
</span>
</label>
<select
                    class="select select-bordered w-full "
                    data-testid="create-staff-role-select"
                    id="role"
                    name="role"
                  >
<option
                      value=""
                    >
Select a role
</option>
<option
                      value="MANAGER"
                    >
Manager
</option>
<option
                      value="STAFF"
                    >
Staff
</option>
<option
                      value="KITCHEN"
                    >
Kitchen
</option>
</select>
</div>
<div
                  class="card-actions mt-6 justify-end"
                >
<button
                    class="btn btn-ghost"
                    data-testid="create-staff-cancel-button
-bottom"
                    type="button"
                  >
Cancel
</button>
<button
                    class="btn btn-primary "
                    data-testid="create-staff-submit-button
"
                    type="submit"
                  >
Create Staff Member
</button>
</div>
</form>
</div>
</div>
</div>
</div>
</body>

      101 |
      102 |     // Check for email validation error
    > 103 |     await waitFor(() => {
          |                  ^
      104 |       const errorElement = screen.getByTestId('

create-staff-email-error');
105 | expect(errorElement).toBeInTheDocument();
106 | expect(errorElement).toHaveTextContent('I
nvalid email address');

      at waitForWrapper (../../node_modules/.pnpm/@testing-

library+dom@9.3.4/node_modules/@testing-library/dom/dist/wa
it-for.js:163:27)
at Object.<anonymous> (app/locations/[locationId]/sta
ff/create/page.test.tsx:103:18)

Test Suites: 5 failed, 26 passed, 31 total
Tests: 19 failed, 125 passed, 144 total
Snapshots: 0 total
Time: 2.821 s
Ran all test suites.
 ELIFECYCLE  Command failed with exit code 1.
 ELIFECYCLE  Test failed. See above for more details.
command finished with error: command (/Users/xemil/Source/n
ory-challange/apps/web) /Users/xemil/.config/yarn/global/no
de_modules/.bin/pnpm run test app/locations/[locationId]/re
ports/page.test.tsx exited (1)
└─ web#test ──
web#test: command (/Users/xemil/Source/nory-challange/apps/web) /Users/xemil/.config/yarn/global/node_modules/.bin/pnpm run test app/locations/[locationId]/reports/page.test.tsx exited (1)

Tasks: 5 successful, 6 total
Cached: 5 cached, 6 total
Time: 4.551s
Failed: web#test
