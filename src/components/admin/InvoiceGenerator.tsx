
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image
} from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

// Define types for our invoice data
export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Customer {
  name: string;
  email: string;
  address: string;
}

export interface InvoiceData {
  id: string;
  date: string;
  dueDate: string;
  customer: Customer;
  items: OrderItem[];
  taxRate?: number;
  taxAmount?: number;
  subtotal: number;
  total: number;
  notes?: string;
}

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  companyInfo: {
    width: '60%',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyAddress: {
    fontSize: 10,
    color: '#555',
  },
  invoiceInfo: {
    width: '40%',
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  invoiceId: {
    fontSize: 10,
    marginBottom: 2,
  },
  dates: {
    fontSize: 10,
    color: '#555',
  },
  customerSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  customerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  customerInfo: {
    fontSize: 10,
    color: '#333',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderColor: '#eee',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    height: 24,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    height: 24,
    fontSize: 10,
  },
  tableCol1: {
    width: '10%',
  },
  tableCol2: {
    width: '50%',
  },
  tableCol3: {
    width: '10%',
    textAlign: 'right',
  },
  tableCol4: {
    width: '15%',
    textAlign: 'right',
  },
  tableCol5: {
    width: '15%',
    textAlign: 'right',
  },
  summarySection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'flex-end',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  summaryLabel: {
    width: '20%',
    textAlign: 'right',
    fontSize: 10,
    marginRight: 10,
  },
  summaryValue: {
    width: '15%',
    textAlign: 'right',
    fontSize: 10,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  notes: {
    marginTop: 30,
    fontSize: 10,
    color: '#555',
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10,
  },
  logo: {
    width: 150,
    marginBottom: 10,
  },
});

// Create Invoice Document
const InvoiceDocument = ({ data }: { data: InvoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>VendorSphere Inc.</Text>
          <Text style={styles.companyAddress}>
            123 Market Street, Suite 456{'\n'}
            San Francisco, CA 94101{'\n'}
            United States{'\n'}
            +1 (555) 123-4567{'\n'}
            billing@vendorsphere.com
          </Text>
        </View>
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={styles.invoiceId}>Invoice #: {data.id}</Text>
          <Text style={styles.dates}>Issue Date: {data.date}</Text>
          <Text style={styles.dates}>Due Date: {data.dueDate}</Text>
        </View>
      </View>

      <View style={styles.customerSection}>
        <Text style={styles.customerTitle}>Bill To:</Text>
        <Text style={styles.customerInfo}>
          {data.customer.name}{'\n'}
          {data.customer.email}{'\n'}
          {data.customer.address}
        </Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCol1}>Item #</Text>
          <Text style={styles.tableCol2}>Description</Text>
          <Text style={styles.tableCol3}>Qty</Text>
          <Text style={styles.tableCol4}>Unit Price</Text>
          <Text style={styles.tableCol5}>Amount</Text>
        </View>
        
        {data.items.map((item) => (
          <View style={styles.tableRow} key={item.id}>
            <Text style={styles.tableCol1}>{item.id}</Text>
            <Text style={styles.tableCol2}>{item.name}</Text>
            <Text style={styles.tableCol3}>{item.quantity}</Text>
            <Text style={styles.tableCol4}>${item.price.toFixed(2)}</Text>
            <Text style={styles.tableCol5}>${(item.quantity * item.price).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summarySection}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>${data.subtotal.toFixed(2)}</Text>
        </View>
        
        {data.taxRate && data.taxAmount && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax ({data.taxRate}%):</Text>
            <Text style={styles.summaryValue}>${data.taxAmount.toFixed(2)}</Text>
          </View>
        )}
        
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, styles.totalLabel]}>Total:</Text>
          <Text style={[styles.summaryValue, styles.totalValue]}>${data.total.toFixed(2)}</Text>
        </View>
      </View>

      {data.notes && (
        <View style={styles.notes}>
          <Text style={styles.notesTitle}>Notes:</Text>
          <Text>{data.notes}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text>Thank you for your business! Payment is due within 30 days.</Text>
      </View>
    </Page>
  </Document>
);

interface InvoiceGeneratorProps {
  invoiceData: InvoiceData;
  filename?: string;
}

const InvoiceGenerator = ({ invoiceData, filename = 'invoice' }: InvoiceGeneratorProps) => {
  return (
    <PDFDownloadLink
      document={<InvoiceDocument data={invoiceData} />}
      fileName={`${filename}-${invoiceData.id}.pdf`}
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) => (
        <Button 
          variant="outline" 
          className="gap-2" 
          disabled={loading}
        >
          <FileText className="h-4 w-4" />
          {loading ? 'Generating Invoice...' : 'Download Invoice'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default InvoiceGenerator;
