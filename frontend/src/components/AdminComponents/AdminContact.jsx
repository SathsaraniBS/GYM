import { useState, useEffect } from 'react';
import api from '../../api/api';
import { Trash2, MessageSquare, Mail, Calendar, User } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const { addToast: showToast } = useToast();

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const { data } = await api.get('/contacts');
            setContacts(data);
        } catch (error) {
            showToast('Error fetching queries', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this query?')) {
            try {
                await api.delete(`/contacts/${id}`);
                setContacts(contacts.filter(c => c._id !== id));
                showToast('Query deleted', 'success');
            } catch (error) {
                showToast('Error deleting query', 'error');
            }
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-luxury-900 dark:text-white">Customer Queries</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Messages from the contact form</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact) => (
                    <div key={contact._id} className="glass-card p-6 rounded-2xl border border-luxury-200 dark:border-white/5 hover:border-gold-500/30 transition-all group flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-luxury-900 dark:text-white text-sm">{contact.name}</h3>
                                    <div className="flex items-center gap-1 text-xs text-blue-500">
                                        <Mail className="w-3 h-3" />
                                        {contact.email}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a
                                    href={`mailto:${contact.email}?subject=Re: Query from Cinemania`}
                                    className="text-gray-400 hover:text-blue-500 p-1 hover:bg-blue-500/10 rounded transition-colors"
                                    title="Reply via Email"
                                >
                                    <Mail className="w-4 h-4" />
                                </a>
                                <button
                                    onClick={() => handleDelete(contact._id)}
                                    className="text-gray-400 hover:text-red-500 p-1 hover:bg-red-500/10 rounded transition-colors"
                                    title="Delete Query"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-grow">
                            {contact.subject && (
                                <p className="text-xs font-semibold text-gold-600 dark:text-gold-400 mb-2 truncate">
                                    Subject: {contact.subject}
                                </p>
                            )}
                            <div className="bg-luxury-50 dark:bg-black/20 p-4 rounded-xl text-sm leading-relaxed text-luxury-700 dark:text-gray-300 border border-luxury-100 dark:border-white/5">
                                "{contact.message}"
                            </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-luxury-200 dark:border-white/5 flex items-center justify-end text-xs text-gray-400 gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                ))}

                {contacts.length === 0 && (
                    <div className="col-span-full py-16 text-center text-gray-400 bg-luxury-50/50 dark:bg-white/5 rounded-2xl border border-dashed border-luxury-200 dark:border-white/10">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        No queries found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminContacts;
