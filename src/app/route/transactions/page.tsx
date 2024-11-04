"use client"
import { Table } from '@mantine/core';
const sampleTransactions = [
    { transactionId: 'TXN001', transactionName: 'Purchase', amount: 100.00, dateTime: '2023-01-01 12:00:00' },
    { transactionId: 'TXN002', transactionName: 'Refund', amount: -50.00, dateTime: '2023-01-02 14:30:00' },
    { transactionId: 'TXN003', transactionName: 'Transfer', amount: 200.00, dateTime: '2023-01-03 09:15:00' },
    { transactionId: 'TXN004', transactionName: 'Withdrawal', amount: -100.00, dateTime: '2023-01-04 16:45:00' },
    { transactionId: 'TXN005', transactionName: 'Deposit', amount: 150.00, dateTime: '2023-01-05 11:20:00' },
  ];

export default function Transactions() {
  const rows = sampleTransactions.map((element) => (
    <Table.Tr key={element.transactionId} style={{ color: element.amount < 0 ? 'red' : 'green' }}>
      <Table.Td>{element.transactionName}</Table.Td>
      <Table.Td>{element.transactionId}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{element.dateTime}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500} >
      <Table  striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Transaction Name</Table.Th>
            <Table.Th>Transacrion Id</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Date and time</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}