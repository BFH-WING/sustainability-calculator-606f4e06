import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow, format } from "date-fns";

interface LCARequest {
  id: string;
  business_name: string;
  contact_name: string;
  contact_email: string;
  created_at: string;
}

interface LCARequestsTableProps {
  requests: LCARequest[];
}

const LCARequestsTable = ({ requests }: LCARequestsTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">LCA Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business Name</TableHead>
            <TableHead>Contact Name</TableHead>
            <TableHead>Contact Email</TableHead>
            <TableHead>Date Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.business_name}</TableCell>
              <TableCell>{request.contact_name}</TableCell>
              <TableCell>{request.contact_email}</TableCell>
              <TableCell>
                <span className="text-gray-600">
                  {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                </span>
                <span className="text-gray-400 text-sm ml-1">
                  ({format(new Date(request.created_at), "PPP")})
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LCARequestsTable;