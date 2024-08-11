import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Select, Alert, AlertIcon } from '@chakra-ui/react';

// Interface pour les répertoires
interface Repertory {
    id: number;
    title: string;
}

const MAX_FILE_SIZE_MB = 16; // Taille maximale du fichier en Mo
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // Convertir en octets

const FileManager: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);  // Ceci est le File natif du navigateur
    const [directories, setDirectories] = useState<Repertory[]>([]);
    const [selectedDirectory, setSelectedDirectory] = useState<number | null>(null);  // Utilisez l'ID du répertoire sélectionné
    const [isHovered, setIsHovered] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | 'warning' | undefined>(undefined);

    useEffect(() => {
        fetchRepertories();
    }, []);

    const fetchRepertories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/repertories`);
            if (!response.ok) {
                throw new Error('Failed to fetch repertories');
            }
            const data: Repertory[] = await response.json();
            setDirectories(data);
        } catch (error) {
            console.error('Error fetching repertories:', error);
            setMessage('Failed to fetch repertories 😢');
            setMessageType('error');
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE_BYTES) {
                setMessage('File size exceeds 16 MB limit.');
                setMessageType('error');
                event.target.value = ''; // Réinitialiser le champ de fichier
                return;
            }
            setSelectedFile(file);  // File natif du navigateur
            setMessage(null); // Réinitialiser le message en cas de succès
            setMessageType(undefined); // Réinitialiser le type de message
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile || selectedDirectory === null) {
            setMessage('Please select a file and a repertory.');
            setMessageType('error');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('title', selectedFile.name);
        formData.append('repertoryId', selectedDirectory.toString());

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Ajoutez l'en-tête d'authentification si nécessaire
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const result = await response.json();
            setMessage('Successfully uploaded 🥳');
            setMessageType('success');
            console.log('Upload successful:', result);
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Failed to upload file 😢');
            setMessageType('error');
        }
    };

    return (
        <div className="file-manager">
            <div className="actions">
                {message && messageType && (
                    <Alert status={messageType}>
                        <AlertIcon />
                        {message}
                    </Alert>
                )}
                <div>
                    Choisissez un répertoire pour la sauvegarde :
                    <Select
                        value={selectedDirectory ?? ''}
                        onChange={(e) => setSelectedDirectory(Number(e.target.value))}
                        placeholder="📁"
                    >
                        {directories.map((dir) => (
                            <option key={dir.id} value={dir.id}>
                                {dir.title}
                            </option>
                        ))}
                    </Select>
                </div>
                <br />
                Fichier à sauvegarder :
                <input
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                    style={{ borderWidth: "2px", borderColor: "orange", padding: "2px", borderRadius: "5px" }}
                />
                <span style={{ color: "red", fontWeight: "bold" }}>16Mo Max.</span>
                <br /><br></br>
                <Button
                    style={{
                        borderWidth: "2px",
                        borderColor: "orange",
                        width: "200px",
                        color: isHovered ? "white" : "orange",
                        backgroundColor: isHovered ? "orange" : "transparent",
                    }}
                    onClick={handleSubmit}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default FileManager;
