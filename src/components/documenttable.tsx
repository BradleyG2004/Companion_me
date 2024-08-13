import React, { useEffect, useState } from 'react';
import { Select, Button, Alert, AlertIcon } from '@chakra-ui/react';

interface Document {
  id: number;
  title: string;
  repertory: {
    id: number;
    title: string;
  };
  user: {
    id: number;
  };
  createdAt: string;
}

interface Repertory {
  id: number;
  title: string;
}

const DocumentTable: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [repertories, setRepertories] = useState<Repertory[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | undefined>(undefined);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newRepertoryId, setNewRepertoryId] = useState<number | null>(null);
  const userId = parseInt(localStorage.getItem('id') || '0', 10);

  useEffect(() => {
    fetchDocuments();
    fetchRepertories();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/documents`);
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setMessage('Failed to fetch documents.');
      setMessageType('error');
    }
  };

  const fetchRepertories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/repertories`);
      const data = await response.json();
      setRepertories(data);
    } catch (error) {
      console.error('Error fetching repertories:', error);
      setMessage('Failed to fetch repertories.');
      setMessageType('error');
    }
  };

  const handleDownload = async (documentId: number, documentTitle: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/${documentId}/download`);

      if (!response.ok) {
        throw new Error('Failed to download document.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = documentTitle;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setMessage('Document downloaded successfully.');
      setMessageType('success');
    } catch (error) {
      console.error('Error downloading document:', error);
      setMessage('Failed to download document.');
      setMessageType('error');
    }
  };

  const handleUpdateDocument = async (documentId: number, newTitle: string | null, newRepertoryId: number | null) => {
    try {
      const updatePayload: { id: number; title?: string; repertoryId?: number } = { id: documentId };

      if (newTitle) {
        updatePayload.title = newTitle;
      }

      if (newRepertoryId) {
        updatePayload.repertoryId = newRepertoryId;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/documents`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        throw new Error('Failed to update document.');
      }

      setMessage('Document updated successfully.');
      setMessageType('success');
      fetchDocuments(); // Refresh the documents list
      setSelectedDocument(null); // Clear the selection after update
      setNewTitle(''); // Reset title input
      setNewRepertoryId(null); // Reset repertory selection
    } catch (error) {
      console.error('Error updating document:', error);
      setMessage('Failed to update document.');
      setMessageType('error');
    }
  };

  const handleDeleteDocument = async (documentId: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/documents`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: documentId,
          isDeleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete document.');
      }

      setMessage('Document deleted successfully.');
      setMessageType('success');
      fetchDocuments(); // Refresh the documents list
    } catch (error) {
      console.error('Error deleting document:', error);
      setMessage('Failed to delete document.');
      setMessageType('error');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            {message && messageType && (
              <Alert status={messageType}>
                <AlertIcon />
                {message}
              </Alert>
            )}
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Title</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Repertory</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Uploaded at</th>
                  <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {documents.map((document) => (
                  <tr key={document.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                      {document.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                      {document.repertory.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                      {new Date(document.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <Button
                        colorScheme="blue"
                        onClick={() => handleDownload(document.id, document.title)}
                      >
                        Download
                      </Button>
                      {document.user.id === userId && (
                        <>
                          <Select
                            placeholder="Change Repertory"
                            onChange={(e) => setNewRepertoryId(Number(e.target.value))}
                          >
                            {repertories.map((repertory) => (
                              <option key={repertory.id} value={repertory.id}>
                                {repertory.title}
                              </option>
                            ))}
                          </Select>
                          <input
                            type="text"
                            placeholder="New Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="mt-2 px-3 py-2 border border-gray-300 rounded-md"
                          />
                          <Button
                            colorScheme="green"
                            onClick={() => handleUpdateDocument(document.id, newTitle, newRepertoryId)}
                            className="ml-2"
                          >
                            Save
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDeleteDocument(document.id)}
                            className="ml-2"
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTable;
