CREATE OR REPLACE FUNCTION get_customer_data(id uuid)
  RETURNS TABLE(
    -- customer
    customer_id uuid,
    customer_email text,
    -- type
    type text,
    -- common data
    cf text,
    phone text,
    -- business customer
    business_name text,
    piva text,
    pec text,
    sdi text,
    -- private customer
    name text,
    surname text
  )
  AS $$
BEGIN
  RETURN QUERY
  SELECT
    -- customer
    c.id AS customer_id,
    c.email AS customer_email,
    -- type
    CASE WHEN cb.id_customer IS NOT NULL THEN
      'business'
    WHEN cp.id_customer IS NOT NULL THEN
      'private'
    ELSE
      NULL
    END AS type,
    -- common data
    coalesce(cb.cf, cp.cf, null) as cf,
    coalesce(cb.phone, cp.phone, null) as phone,
    -- business customer
    cb.name business_name,
    cb.piva piva,
    cb.sdi sdi,
    cb.pec pec,
    -- private customer
    cp.name as name,
    cp.surname as surname
  FROM
    customers c
  LEFT JOIN customer_business cb ON c.id = cb.id_customer
  LEFT JOIN customer_private cp ON c.id = cp.id_customer
WHERE(cb.id_customer IS NOT NULL
    OR cp.id_customer IS NOT NULL);
END;
$$
LANGUAGE plpgsql;

