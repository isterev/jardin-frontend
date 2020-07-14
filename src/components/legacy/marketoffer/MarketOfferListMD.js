// "use strict";
//
// import React from 'react';
// import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';
//
// import { MarketOfferListRowMD } from './MarketOfferListRowMD';
// import Page from '../../Page'
//
// const dataTableStyle = {
//   'marginBottom': '36px'
// };
//
// export const MarketOfferListMD = ({data, onDelete}) => (
//     <Page>
//         <DataTable plain style={dataTableStyle}>
//             <TableHeader>
//                 <TableRow>
//                     <TableColumn></TableColumn>
//                     <TableColumn>Name</TableColumn>
//                     <TableColumn>Edit</TableColumn>
//                     <TableColumn>Remove</TableColumn>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {data.map((marketOffer, i) => <MarketOfferListRowMD key={i} marketOffer={marketOffer} onDelete={(id) => onDelete(id)} />)}
//             </TableBody>
//         </DataTable>
//     </Page>
// );
//
