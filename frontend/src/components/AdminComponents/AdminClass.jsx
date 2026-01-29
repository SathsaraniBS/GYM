import React from 'react'

function AdminClass() {
  return (
     <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-luxury-900 dark:text-white">Gym Packages</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your gym's packages</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-gold-500/20 transition-all hover:scale-105"
                >
                    <Plus className="w-5 h-5" /> Add New gympackeage name 
                </button>
            </div>

            {/* Search Bar */}
            <div className="glass-card p-4 rounded-xl border border-luxury-200 dark:border-white/5 flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search gym packages by title..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="bg-transparent w-full outline-none text-luxury-900 dark:text-white placeholder-gray-400"
                />
            </div>

            {/* Class Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map(gympackeage => (
                    <div key={gympackeage._id} className="glass-card rounded-2xl overflow-hidden border border-luxury-200 dark:border-white/5 group hover:border-gold-500/50 transition-all duration-300">
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <img
                                src={gympackeage.poster}
                                alt={gympackeage.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(movie)}
                                        className="flex-1 bg-white/10 backdrop-blur-sm text-white py-2 rounded-lg font-bold hover:bg-white/20 flex items-center justify-center gap-2"
                                    >
                                        <Edit2 className="w-4 h-4" /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(movie._id)}
                                        className="flex-1 bg-red-500/20 backdrop-blur-sm text-red-500 py-2 rounded-lg font-bold hover:bg-red-500/30 flex items-center justify-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            </div>
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-gold-500 text-xs font-bold border border-white/10">
                                <Star className="w-3 h-3 fill-gold-500" /> {gympackeage.rating}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-luxury-900 dark:text-white truncate mb-1">{gympackeage.title}</h3>
                            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(gympackeage.releaseDate).getFullYear()}
                                </span>
                                <span>{gympackeage.duration} mins</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-1">
                                {(Array.isArray(gympackeage.genre) ? gympackeage.genre : (typeof gympackeage.genre === 'string' ? gympackeage.genre.split(',') : [])).slice(0, 3).map((g, i) => (
                                    <span key={i} className="text-[10px] uppercase bg-luxury-100 dark:bg-white/5 text-luxury-600 dark:text-gray-300 px-2 py-0.5 rounded border border-luxury-200 dark:border-white/10">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-luxury-50 dark:bg-luxury-900 w-full max-w-2xl rounded-3xl border border-luxury-200 dark:border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-luxury-200 dark:border-white/10 flex justify-between items-center bg-white dark:bg-luxury-900 sticky top-0 z-10">
                            <h3 className="text-xl font-bold font-serif text-luxury-900 dark:text-white flex items-center gap-2">
                                <Film className="w-5 h-5 text-gold-500" />
                                {editMode ? 'Edit gympackage' : 'Add New gympackage'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors text-white">
                                {/* Using text-white explicitly or standard text color */}
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Movie Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none transition-colors text-luxury-900 dark:text-white"
                                        placeholder="Enter gym package title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Description</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none transition-colors h-24 text-luxury-900 dark:text-white"
                                        placeholder="Gym packages synopsis..."
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
  )

      
    
  
}

export default AdminClass
