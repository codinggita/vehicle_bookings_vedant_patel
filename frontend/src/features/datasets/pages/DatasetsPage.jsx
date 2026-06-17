import { useState, useEffect, useCallback, useMemo } from 'react';
import Seo from '@components/seo/Seo';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchDatasets } from '../store/datasetThunks';
import { setSelectedDataset, clearSelectedDataset } from '../store/datasetSlice';
import DatasetSearch from '../components/DatasetSearch';
import DatasetFilters from '../components/DatasetFilters';
import DatasetTable from '../components/DatasetTable';
import DatasetPagination from '../components/DatasetPagination';
import CreateDatasetModal from '../components/CreateDatasetModal';
import EditDatasetModal from '../components/EditDatasetModal';
import DeleteDatasetDialog from '../components/DeleteDatasetDialog';

/**
 * DatasetsPage Component
 * Main coordinator page for dataset management.
 */
const DatasetsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // Redux Selectors
  const { datasets, loading, error } = useSelector((state) => state.datasets);

  // Modals Visibility State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Re-fetch datasets whenever URL parameters change
  useEffect(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    dispatch(fetchDatasets(params));
  }, [searchParams, dispatch]);

  const handleRetry = useCallback(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    dispatch(fetchDatasets(params));
  }, [searchParams, dispatch]);

  const handleEditClick = useCallback((dataset) => {
    dispatch(setSelectedDataset(dataset));
    setIsEditOpen(true);
  }, [dispatch]);

  const handleEditClose = useCallback(() => {
    dispatch(clearSelectedDataset());
    setIsEditOpen(false);
  }, [dispatch]);

  const handleDeleteClick = useCallback((dataset) => {
    setDeleteTarget(dataset);
    setIsDeleteOpen(true);
  }, []);

  const handleDeleteClose = useCallback(() => {
    setDeleteTarget(null);
    setIsDeleteOpen(false);
  }, []);

  const filterKey = useMemo(() => `${searchParams.get('status') || ''}-${searchParams.get('vehicle') || ''}-${searchParams.get('payment') || ''}-${searchParams.get('minRating') || ''}-${searchParams.get('minFare') || ''}-${searchParams.get('maxFare') || ''}-${searchParams.get('minDistance') || ''}-${searchParams.get('maxDistance') || ''}-${searchParams.get('date') || ''}`, [searchParams]);

  return (
    <>
      <Seo />
      <div className="space-y-6 select-none max-w-[1600px] mx-auto">
      
      {/* 1. Header block */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight">
            Dataset Management
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Monitor, filter, and organize raw booking datasets.
          </p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-600/35 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Booking Record
        </button>
      </div>

      {/* 2. Controls and filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <DatasetSearch key={searchParams.get('search') || ''} />
        </div>
        <DatasetFilters key={filterKey} />
      </div>

      {/* 3. Table lists views */}
      <div className="relative">
        <DatasetTable
          datasets={datasets}
          loading={loading}
          error={error}
          onRetry={handleRetry}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* 4. Page navigators */}
      <DatasetPagination />

      {/* Modals & Dialog overlays */}
      <CreateDatasetModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <EditDatasetModal
        isOpen={isEditOpen}
        onClose={handleEditClose}
      />

      <DeleteDatasetDialog
        isOpen={isDeleteOpen}
        datasetId={deleteTarget?._id || ''}
        bookingId={deleteTarget?.bookingId || ''}
        onClose={handleDeleteClose}
      />

    </div>
    </>
  );
};

export default DatasetsPage;
