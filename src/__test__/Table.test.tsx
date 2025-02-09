import { render, screen } from '@testing-library/react';
import DataTable from '../components/Table/Table';
import { convertDate } from '../utils';
import { Repo } from '@/types';

describe('DataTable', () => {
  const mockData = [
    {
      id: 1234,
      owner: {
        login: 'testUser1'
      },
      description: 'Test repository 1',
      stargazers_count: 100,
      forks: 50,
      updated_at: '2024-03-15T10:00:00Z'
    },
    {
      id: 5678,
      owner: {
        login: 'testUser2'
      },
      description: 'Test repository 2',
      stargazers_count: 200,
      forks: 75,
      updated_at: '2024-03-16T11:00:00Z'
    }
  ] as Repo[];

  it('renders table headers correctly', () => {
    render(<DataTable data={mockData} />);

    const headers = [
      'Repository Id',
      'Username',
      'Repo Description',
      'Stars',
      'Forks',
      'Last Updated Time'
    ];

    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('renders repository data correctly', () => {
    render(<DataTable data={mockData} />);

    // Check first row data
    expect(screen.getByText('1234')).toBeInTheDocument();
    expect(screen.getByText('testUser1')).toBeInTheDocument();
    expect(screen.getByText('Test repository 1')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText(convertDate('2024-03-15T10:00:00Z'))).toBeInTheDocument();

    // Check second row data
    expect(screen.getByText('5678')).toBeInTheDocument();
    expect(screen.getByText('testUser2')).toBeInTheDocument();
    expect(screen.getByText('Test repository 2')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText(convertDate('2024-03-16T11:00:00Z'))).toBeInTheDocument();
  });

  it('renders empty table view when no data is provided', () => {
    render(<DataTable data={[]} />);

    const headers = [
      'Repository Id',
      'Username',
      'Repo Description',
      'Stars',
      'Forks',
      'Last Updated Time'
    ];

    // Headers should still be present
    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });

    // Table body should be empty
    const emptyTable = screen.getByTestId('empty-table');
    expect(emptyTable).toBeInTheDocument();
  });

  it('generates unique keys for each row', () => {
    render(<DataTable data={mockData} />);

    const tbody = document.querySelector('tbody');
    const rows = tbody?.querySelectorAll('tr');

    if (rows) {
      mockData?.forEach((data, index) => {
        expect(rows[index].getAttribute('data-testkey')).toBe(`table-item-${data.id}`);
      });
    }
  });
});